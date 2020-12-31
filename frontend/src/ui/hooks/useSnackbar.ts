import {useContext} from 'react';
import {SnackbarContext} from '../common/Snackbar/SnackbarProvider';

export const useSnackbar = (): {show: (message: string) => void} => useContext(SnackbarContext);
