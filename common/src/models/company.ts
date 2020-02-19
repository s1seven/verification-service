export interface Company {
  name: string;
  vatId: string;
  publicKey: string;
  receiveByEmail: boolean;
  url: string;
}

export interface CompanyCreationResponse {
  link: string;
}
