import React from 'react';
import {cn} from '../../../utils/cn';

interface SnackbarProps {
  content: string;
  visible: boolean;
  className?: string;
}

export const Snackbar = ({content, className, visible}: SnackbarProps) => (
  <div className={cn('snackbar', !visible && 'snackbar-hidden', className)}>
    <p className='snackbar-content'>{content}</p>
  </div>
);
