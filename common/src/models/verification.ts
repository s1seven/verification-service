export type Verification = {
  creator: string;
  isVerified: true;
  timestamp: string;
  id: string;
  link: string;
} | { isVerified: false };
