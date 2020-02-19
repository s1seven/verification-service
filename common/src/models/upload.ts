export interface SuccessfulUpload<T> {
  status: 'success';
  creator: string;
  transactionLink: string;
  data: T;
}

export interface FailedUpload<T> {
  status: 'failed';
  creator: string;
  errorMessage: string;
  data: T;
  rawTransaction?: unknown;
}

export interface InvalidDataUpload {
  status: 'invalid-data';
  creator: string;
  errorMessage: string;
  data: unknown;
}

export declare type Upload<T>
  = SuccessfulUpload<T>
  | FailedUpload<T>
  | InvalidDataUpload;

export declare type UploadState = Upload<unknown>['status']

export interface UploadResponse {
  file: string;
}
