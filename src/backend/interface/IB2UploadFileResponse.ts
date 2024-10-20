export interface IB2UploadFileResponse {
  accountId: string;
  action: string;
  bucketId: string;
  contentLength: number;
  contentType: string;
  fileId: string;
  fileName: string;
  uploadTimestamp: number;
}