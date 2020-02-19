/* eslint-disable camelcase,@typescript-eslint/camelcase */
import {ConsignmentBill, ConsignmentBillUpload} from 'verification-service-common/models';
import {DataRecord, dataRecordMapper} from './dataRecordMapper';

export type ConsignmentBillUploadDataRecord = DataRecord<ConsignmentBill>;

export const consignmentBillUploadMapper = {
  fromDataRecord: (dataRecord: ConsignmentBillUploadDataRecord): ConsignmentBillUpload => {
    const plainConsignmentBillUpload = dataRecordMapper<ConsignmentBill>().fromDataRecord(dataRecord);
    if (plainConsignmentBillUpload.status === 'invalid-data') {
      return plainConsignmentBillUpload;
    }
    return {
      ...plainConsignmentBillUpload,
      data: new ConsignmentBill(plainConsignmentBillUpload.data.ConsignmentBill)
    };
  },
  toDataRecord: dataRecordMapper<ConsignmentBill>().toDataRecord
};
