import {config} from '../config';
import {ApiService} from './apiService';
import {createContext} from 'react';
import {NotarizationService} from './notarizationService';

export const setup = () => {
  const apiService = new ApiService(config.apiUrl);
  return {
    notarizationService: new NotarizationService(apiService)
  };
};

export const ServiceContext = createContext<ReturnType<typeof setup>>({} as any);
