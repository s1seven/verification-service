/* eslint-disable @typescript-eslint/no-unused-vars */
import {useContext} from 'react';
import {VerificationService} from '../../services/verificationService';
import {ServiceContext} from '../../services/serviceContext';
import {BigchainService} from '../../services/bigchainService';
import {RenderService} from '../../services/renderService';

export const useServices = (): {
  verificationService: VerificationService;
  bigchainService: BigchainService;
  renderService: RenderService;
  validateCertificateFile: (
  file: File
  ) => Promise<
  | {
    ok: string | Record<string, any>;
  }
  | {
    error: any;
  }
  >;
} => useContext(ServiceContext);
