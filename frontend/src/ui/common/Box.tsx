import React, {ReactNode} from 'react';
import {cn} from '../../utils/cn';

export interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box = ({children, className}: BoxProps) => <div className={cn('box', className)}>{children}</div>;

export const BoxHeader = ({children, className}: BoxProps) => <div className={cn('box-header', className)}>{children}</div>;

export const BoxTitle = ({children}: BoxProps) => <h2 className='box-title'>{children}</h2>;
