import {Router as expressRouter} from 'express';
import {Services} from '../build';
import {verification} from './verification';
import {renderCertificate} from './renderCertificate';

export const router = ({verificationService}: Services) => {
  const router = expressRouter();

  router.use('/verify', verification(verificationService));
  router.use('/renderCertificate', renderCertificate());

  return router;
};
