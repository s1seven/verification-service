export type Verification =
  | {
    creator: string;
    attestation: Attestation | null;
    isVerified: true;
    timestamp: string;
    id: string;
    link: string;
  }
  | { isVerified: false };

export interface Attestation {
  CompanyName: string;
  Street: string;
  ZipCode: string;
  City: string;
  Email: string;
  WWW: string;
  publicKey: string;
  Accreditations?: string | string[];
  links: string[];
  assetId: string;
}
