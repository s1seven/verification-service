import {config} from '../config';
import {ApiService} from './apiService';
import {createContext} from 'react';
import {VerificationService} from './verificationService';
import {BigchainService} from './bigchainService';
import {validateCertificateFile} from './validationService';
import { RenderService } from './renderService';

export const setup = () => {
  const apiService = new ApiService(config.apiUrl);
  return {
    verificationService: new VerificationService(apiService),
    bigchainService: new BigchainService(config.bigchaindbUrl),
    renderService: new RenderService(apiService),
    validateCertificateFile
  };
};

export const ServiceContext = createContext<ReturnType<typeof setup>>({} as any);
