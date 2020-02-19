import React, {createContext, ReactNode, useState} from 'react';
import {Snackbar} from './Snackbar';

export const SnackbarContext = createContext<{show: (message: string) => void}>({} as any);

const SNACKBAR_TIMEOUT = 3000;
let timerId: NodeJS.Timeout;

export function SnackbarProvider({children}: {children: ReactNode}) {
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);

  const show = (message: string) => {
    clearTimeout(timerId);
    setContent(message);
    setVisible(true);
    timerId = setTimeout(() => setVisible(false), SNACKBAR_TIMEOUT);
  };

  return (
    <SnackbarContext.Provider value={{show}}>
      {children}
      <Snackbar content={content} visible={visible}/>
    </SnackbarContext.Provider>
  );
}
