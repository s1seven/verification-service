import {Router as expressRouter} from 'express';
import {Services} from '../build';
import {notarization} from './notarization';

export const router = ({}: Services) => {
  const router = expressRouter();

  router.use('/notarize', notarization());

  return router;
};
