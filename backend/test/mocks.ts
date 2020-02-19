import {toNumber} from 'verification-service-common/utils';

export const exampleCertificate = (weight: string) => ({
  'A03-1': '0000001',
  A01: {
    CompanyName: 'Steel Factory',
    Street: 'Stahlstrasse 1',
    ZipCode: '4010',
    City: 'Linz',
    Country: 'AT',
    // eslint-disable-next-line camelcase,@typescript-eslint/camelcase
    VAT_Id: 'ATU12345678'
  },
  A06: {
    CompanyName: 'Steel Trading',
    Street: 'Handelsgasse 1',
    ZipCode: '10115',
    City: 'Berlin',
    Country: 'DE',
    // eslint-disable-next-line camelcase,@typescript-eslint/camelcase
    VAT_Id: 'DE123456789'
  },
  Order: {
    Number: '1',
    Product: 'VPH200/150X',
    Quantity: '192',
    QuantityUnit: 'm',
    OrderNumber: 'PO_0002',
    ChargeId: '175509',
    Weight: '5971,200',
    WeightUnit: 'kg'
  },
  B01: 'EN10025',
  B02: 'S275J2H',
  'B07-1': '175508',
  B13: toNumber(weight),
  C71: 0.1500,
  C72: 0.0050,
  C73: 1.0000,
  C74: 0.0018,
  C75: 0.2086,
  C76: 0.0389,
  C77: 0.0122,
  C78: 0.0226,
  C79: 0.0081,
  C80: 0.0029,
  C81: 0.0403,
  C82: 0.0031,
  C83: 0.0024,
  C86: 0.017,
  C93: {key: 'whatever', value: 'something'},
  Z02: '2019-05-30T09:30:10-01:00'
});

export const makeExampleTransaction = (transactionId, inputKey, outputs: [string, string][], timestamp: string, weight: string = '5971200') => ({
  id: transactionId,
  // eslint-disable-next-line camelcase,@typescript-eslint/camelcase
  inputs: [{owners_before: [inputKey]}],
  // eslint-disable-next-line camelcase,@typescript-eslint/camelcase
  outputs: outputs.map(([publicKey, amount]) => ({amount, public_keys: [publicKey]})),
  metadata: {buyerCertificate: exampleCertificate(weight), timestamp},
  operation: 'TRANSFER'
});
