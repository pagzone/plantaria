export default interface UploadFileResponse {
  accountId: string;
  action: string;
  bucketId: string;
  contentLength: number;
  contentType: string;
  fileId: string;
  fileName: string;
  uploadTimestamp: number;
}