import {Router as expressRouter} from 'express';
import {Services} from '../build';
import {verification} from './verification';

export const router = ({verificationService}: Services) => {
  const router = expressRouter();

  router.use('/verify', verification(verificationService));

  return router;
};
