import {config} from '../config';
import {ApiService} from './apiService';
import {createContext} from 'react';
import {VerificationService} from './verificationService';

export const setup = () => {
  const apiService = new ApiService(config.apiUrl);
  return {
    verificationService: new VerificationService(apiService)
  };
};

export const ServiceContext = createContext<ReturnType<typeof setup>>({} as any);
