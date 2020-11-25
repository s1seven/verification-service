export type Verification = {
  creator: string;
  attestation: Record<string, unknown> | null;
  isVerified: true;
  timestamp: string;
  id: string;
  link: string;
} | { isVerified: false };
