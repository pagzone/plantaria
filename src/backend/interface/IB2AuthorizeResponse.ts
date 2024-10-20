export interface IB2AuthorizeResponse {
  accountId: string;
  apiInfo: {
    storageApi: {
      apiUrl: string;
      bucketId: string;
      bucketName: string;
      capabilities: string[];
      downloadUrl: string;
      infoType: string;
      s3ApiUrl: string;
    };
  };
  authorizationToken: string;
}