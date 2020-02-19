import {ChargeData} from 'verification-service-common/models';
import {DataRecord, dataRecordMapper} from './dataRecordMapper';

export type ChargeUploadDataRecord = DataRecord<ChargeData>;

export const chargeUploadMapper = dataRecordMapper<ChargeData>();
