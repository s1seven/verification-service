import {useContext} from 'react';
import {ServiceContext} from '../../services/serviceContext';

export const useServices = () => useContext(ServiceContext);
