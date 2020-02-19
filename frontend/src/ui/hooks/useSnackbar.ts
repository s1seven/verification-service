import {useContext} from 'react';
import {SnackbarContext} from '../common/Snackbar/SnackbarProvider';

export const useSnackbar = () => useContext(SnackbarContext);
