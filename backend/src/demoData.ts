import {AccountWithKeys} from 'verification-service-common/models';

export const accounts: AccountWithKeys[] = [{
  accountRole: 'producer',
  privateKey: 'HXKbwZ1wn1zgcxeBa9JKjZon7myr1FyUVAxutvuK4Kxu',
  publicKey: '6MXbQupMW6Vxy95b6DrVYB17bBudJTXG2KyT7Q3gk8iS',
  name: 'John Galt',
  id: '1',
  companyId: 'ATU12345678'
}, {
  accountRole: 'reseller',
  privateKey: '96TEkKr3rX1a1xJGipeXjewD27icKwWtb4FYXaHRrg2m',
  publicKey: '2DpSUpkrhj9EFzzttMdtmBnBpywhjUXL2GDJ4V4K1vHF',
  name: 'Hank Rearden',
  id: '2',
  companyId: 'DE123456789'
}, {
  accountRole: 'consumer-push',
  privateKey: 'HmgTBWNr4jhiVhSqPXmHzWTRaEkZC6Cym3EmJEmjZGfW',
  publicKey: 'AA5HWP7Z6Bb1Lb6evtWADaFp1amyuBL4H1YjEkaAZuzL',
  name: 'Clark Kent',
  id: '3',
  companyId: 'PL1234567890'
}, {
  accountRole: 'consumer-pull',
  privateKey: 'DxrqtgPyLKgzrzX1P2oD5HhDEY33jriDcUrkSpoG3Cxj',
  publicKey: '8Ti4WKKq4vLL5Tscar2gwYYN6VPP7J6bZvmg9rxQE53S',
  name: 'Tony Stark',
  id: '4',
  companyId: 'FR12345678901'
}];

export const companies = [{
  vatId: 'ATU12345678',
  name: 'Steel Factory',
  publicKey: '6MXbQupMW6Vxy95b6DrVYB17bBudJTXG2KyT7Q3gk8iS',
  receiveByEmail: false,
  url: 'url1.com'
}, {
  vatId: 'DE123456789',
  name: 'Steel Trading',
  publicKey: '2DpSUpkrhj9EFzzttMdtmBnBpywhjUXL2GDJ4V4K1vHF',
  receiveByEmail: false,
  url: 'url2.com'
}, {
  vatId: 'PL1234567890',
  name: 'Bridge Builder',
  publicKey: 'AA5HWP7Z6Bb1Lb6evtWADaFp1amyuBL4H1YjEkaAZuzL',
  receiveByEmail: false,
  url: 'url3.com'
}, {
  vatId: 'FR12345678901',
  name: 'Machine Factory',
  publicKey: '8Ti4WKKq4vLL5Tscar2gwYYN6VPP7J6bZvmg9rxQE53S',
  receiveByEmail: false,
  url: 'url4.com'
}];

export const ownerKeys = {privateKey: 'J7jCHpptJsQa3ye3JjfpEqEVP48q2urfvJzksMGKZGCw', publicKey: '8p9WjnBvnHorkd6Qn61ij4FT7saWsLhdcWDBGf77FxZu'};
