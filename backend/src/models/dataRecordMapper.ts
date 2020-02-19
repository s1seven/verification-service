/* eslint-disable camelcase,@typescript-eslint/camelcase */
import {Upload} from 'verification-service-common/models';

export interface DataRecordMapper<T, U> {
  fromDataRecord: (dataRecord: U) => T;
  toDataRecord: (data: T) => U;
}

interface SuccessfulDataRecord<T> {
  status: 'success';
  creator_id: string;
  transaction_link: string;
  data: T;
}
interface FailedDataRecord<T> {
  status: 'failed';
  creator_id: string;
  error_message: string;
  data: T;
  raw_tx?: unknown;
}
interface InvalidDataDataRecord {
  status: 'invalid-data';
  creator_id: string;
  error_message: string;
  data: unknown;
}
export type DataRecord<T>
  = SuccessfulDataRecord<T>
  | FailedDataRecord<T>
  | InvalidDataDataRecord;

export const dataRecordMapper = <T>(): DataRecordMapper<Upload<T>, DataRecord<T>> => ({
  fromDataRecord: (dataRecord: DataRecord<T>): Upload<T> => {
    if (dataRecord.status === 'success') {
      return {
        data: dataRecord.data,
        creator: dataRecord.creator_id,
        status: dataRecord.status,
        transactionLink: dataRecord.transaction_link
      };
    }
    if (dataRecord.status === 'invalid-data') {
      return {
        data: dataRecord.data,
        creator: dataRecord.creator_id,
        status: dataRecord.status,
        errorMessage: dataRecord.error_message
      };
    }
    return {
      data: dataRecord.data,
      creator: dataRecord.creator_id,
      status: dataRecord.status,
      errorMessage: dataRecord.error_message,
      rawTransaction: dataRecord.raw_tx
    };
  },
  toDataRecord: (upload: Upload<T>): DataRecord<T> => {
    if (upload.status === 'success') {
      return {
        data: upload.data,
        creator_id: upload.creator,
        status: upload.status,
        transaction_link: upload.transactionLink
      };
    }
    if (upload.status === 'invalid-data') {
      return {
        data: upload.data,
        creator_id: upload.creator,
        status: upload.status,
        error_message: upload.errorMessage
      };
    }
    return {
      data: upload.data,
      creator_id: upload.creator,
      status: upload.status,
      error_message: upload.errorMessage,
      raw_tx: upload.rawTransaction
    };
  }
});

