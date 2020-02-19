import {asExactObject} from './asExactObject';
import {asArray, asChecked, asString} from '@restless/sanitizers';
import {asEmailAddress} from './asEmailAddress';

export const asPosition = asExactObject({
  Number: asString,
  Product: asString,
  Quantity: asString,
  QuantityUnit: asString,
  OrderNumber: asString,
  ChargeId: asString,
  Weight: asString,
  WeightUnit: asString
});

const asCompanyReceiver = asExactObject({
  CompanyName: asString,
  Street: asString,
  ZipCode: asString,
  City: asString,
  Country: asString,
  // eslint-disable-next-line
  VAT_Id: asString,
  Email: asEmailAddress
});

export const asCompanySender = asExactObject({
  CompanyName: asString,
  Street: asString,
  ZipCode: asString,
  City: asString,
  Country: asString,
  // eslint-disable-next-line
  VAT_Id: asString,
});

export const asConsignmentBill = asExactObject({
  ConsignmentBill: asExactObject({
    ConsignmentBillId: asString,
    CreationDateTime: asString,
    Sender: asCompanySender,
    Receiver: asCompanyReceiver,
    Positions: asChecked(asArray(asPosition),
      (array) => array.length > 0, 'not empty array')
  })
});
