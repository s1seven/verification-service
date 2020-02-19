import React from 'react';
import {Dashboard} from './Dashboard/Dashboard';
import {setup, ServiceContext} from '../services/serviceContext';
import {SnackbarProvider} from './common/Snackbar/SnackbarProvider';

const services = setup();

export const App = () => (
  <ServiceContext.Provider value={services}>
    <SnackbarProvider>
      <Dashboard/>
    </SnackbarProvider>
  </ServiceContext.Provider>
);
