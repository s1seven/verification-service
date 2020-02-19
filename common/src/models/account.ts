export type CompanyRole = 'producer' | 'reseller' | 'consumer-push' | 'consumer-pull';

export interface Account {
  name: string;
  id: string;
  companyId: string;
  accountRole: CompanyRole;
}

export interface Keys {
  privateKey: string;
  publicKey: string;
}

export type AccountWithKeys = Account & Keys;

export interface AccountWithCompanyName extends Omit<Account, 'companyId'> {
  companyName: string;
}
