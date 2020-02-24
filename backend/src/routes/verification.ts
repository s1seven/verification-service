import {Router as expressRouter} from 'express';
import {asyncHandler, responseOf, sanitize} from '@restless/restless';
import {asString} from '@restless/sanitizers';
import {VerificationService} from '../services/verificationService';

export const verification = (verificationService: VerificationService) => {
  const router = expressRouter();

  router.get('/:fileHash', asyncHandler(
    sanitize({fileHash: asString}),
    async ({fileHash}) => responseOf(await verificationService.validate(fileHash))
  ));

  return router;
};
