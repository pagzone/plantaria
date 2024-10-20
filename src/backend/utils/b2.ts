import crypto from 'crypto';
import { IB2AuthorizeResponse } from 'Interfaces/IB2AuthorizeResponse';
import { IB2UploadFileResponse } from 'Interfaces/IB2UploadFileResponse';

async function authorizeB2() {
  const authString = `${process.env.B2_KEY_ID}:${process.env.B2_KEY}`;
  const encodedAuth = Buffer.from(authString).toString('base64');

  const response = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${encodedAuth}`,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    throw new Error(`Authorization failed: ${response.statusText}, Response: ${errorResponse}`);
  }

  const data: IB2AuthorizeResponse = await response.json();

  return {
    authToken: data.authorizationToken,
    apiUrl: data.apiInfo.storageApi.apiUrl,
    downloadUrl: data.apiInfo.storageApi.downloadUrl,
    accountId: data.accountId,
    bucketId: data.apiInfo.storageApi.bucketId,
    bucketName: data.apiInfo.storageApi.bucketName,
  };
}

async function getUploadUrl(authToken: string, apiUrl: string, bucketId: string) {
  const response = await fetch(`${apiUrl}/b2api/v3/b2_get_upload_url?bucketId=${bucketId}`, {
    method: 'GET',
    headers: {
      Authorization: authToken,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to get upload URL: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    uploadUrl: data.uploadUrl,
    uploadAuthToken: data.authorizationToken,
  };
}

async function uploadImage(
  uploadUrl: string,
  uploadAuthToken: string,
  fileBuffer: Buffer,
  fileName: string
) {
  const fileSize = fileBuffer.length;

  const fileSha1 = crypto.createHash('sha1');
  fileSha1.update(fileBuffer);
  const hashHex = fileSha1.digest('hex');

  const response = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: uploadAuthToken,
      'X-Bz-File-Name': fileName,
      'Content-Type': 'b2/x-auto',
      'Content-Length': fileSize.toString(),
      'X-Bz-Content-Sha1': hashHex,
    },
    body: fileBuffer,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.statusText}`);
  }

  const data: IB2UploadFileResponse = await response.json();

  return data;
}

async function uploadToBackblaze(fileBuffer: Buffer, fileName: string) {
  try {
    const { authToken, apiUrl, bucketId } = await authorizeB2();

    const { uploadUrl, uploadAuthToken } = await getUploadUrl(authToken, apiUrl, bucketId);

    const uploadResponse = await uploadImage(uploadUrl, uploadAuthToken, fileBuffer, fileName);

    return uploadResponse;
  } catch (error) {
    console.error('Error uploading to Backblaze:', error);
  }
}

async function getDownloadAuthorization(prefix?: string) {
  try {
    const { authToken, apiUrl, bucketId } = await authorizeB2();

    const response = await fetch(`${apiUrl}/b2api/v3/b2_get_download_authorization`, {
      method: 'POST',
      headers: {
        Authorization: authToken,

      },
      body: JSON.stringify({
        bucketId,
        fileNamePrefix: prefix,
        validDurationInSeconds: 86400,
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to get download authorization: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error getting download authorization:', error);
  }
}

async function getDownloadUrlByName(fileName: string) {
  const { downloadUrl, bucketName } = await authorizeB2();

  return `${downloadUrl}/file/${bucketName}/${fileName}`;
}

async function getAuthorizedDownloadUrlByName(fileName: string, prefix?: string) {
  const authorizedDownloadUrl = await getDownloadUrlByName(fileName);

  return `${authorizedDownloadUrl}?Authorization=${await getDownloadAuthorization(prefix)}`;
}

async function downloadFromBackblazeById(fileId: string) {
  try {
    const { downloadUrl, authToken } = await authorizeB2();

    const response = await fetch(`${downloadUrl}/b2api/v3/b2_download_file_by_id?fileId=${fileId}`, {
      method: 'GET',
      headers: {
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const data = await response.arrayBuffer();

    return data;
  } catch (error) {
    console.error('Error downloading from Backblaze:', error);
  }
}

export {
  authorizeB2,
  uploadToBackblaze,
  downloadFromBackblazeById,
  getDownloadUrlByName,
  getAuthorizedDownloadUrlByName,
  getDownloadAuthorization
}