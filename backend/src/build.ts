import { Config } from './config';
import { VerificationService } from './services/verificationService';
import { BigchainDbWrapper } from './services/bigchainDbWrapper';

export type Services = ReturnType<typeof build>;

export const build = (config: Config) => {
  return {
    verificationService: new VerificationService(
      new BigchainDbWrapper(config.bigchaindbUrl),
    ),
  };
};
