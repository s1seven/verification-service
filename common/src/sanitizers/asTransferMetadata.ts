import {asExactObject} from './asExactObject';
import {asString, asObject, asNumber, asOptional} from '@restless/sanitizers';
import {asCompanySender, asPosition} from './asConsignmentBill';

export const asTransferMetadata = asExactObject({
  buyerCertificate: asObject({
    A01: asCompanySender,
    A06: asCompanySender,
    Order: asPosition,
    'B07-1': asString,
    B13: asNumber
  }),
  inspection: asOptional(asObject({})),
  timestamp: asString
});
