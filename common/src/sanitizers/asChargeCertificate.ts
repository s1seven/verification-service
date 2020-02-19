import {Result} from '@restless/sanitizers';
import Ajv from 'ajv';
import chargeCertificateSchema from '../schemas/chargeCertificateSchema.json';
import {ChargeData} from '../models';

const ajv = new Ajv();
const chargeCertificateValidator = ajv.compile(chargeCertificateSchema);

export const asChargeCertificate = (value, path: string) => {
  const isSchemaValid = chargeCertificateValidator(value);
  if (!isSchemaValid) {
    return Result.error((chargeCertificateValidator.errors || []).map((error) => ({path: `${path}${error.dataPath}`, expected: error.message || ''})));
  }
  return Result.ok(value as ChargeData);
};
