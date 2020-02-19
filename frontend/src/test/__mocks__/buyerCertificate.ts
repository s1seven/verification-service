import {BuyerCertificateWithDescription} from 'verification-service-common/models';

export const mockCertificate: BuyerCertificateWithDescription = {
  buyerCertificate: {
    'A03-1': '1',
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
    'B07-1': '1',
    B13: 24000.0,
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
    C93: {key: 'whatever', value: 'something', unit: 'm/s'},
    unexpectedField: {foo: 'bar'},
    Z02: '2019-05-30T09:30:10-01:00'
  },
  inspection: {
    CO2: 3.14
  },
  timestamp: '2019-05-30T09:30:10-01:00',
  descriptions: {
    'A03-1': 'ID',
    B01: 'Charge ID',
    B13: 'Weight',
    Z02: 'Time'
  },
  units: {
    B13: 'kg',
    C71: '%'
  }
};
