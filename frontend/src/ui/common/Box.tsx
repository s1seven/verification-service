/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {ReactNode} from 'react';
import {cn} from '../../utils/cn';

export interface BoxProps {
  children: ReactNode;
  className?: string;
}

export const Box = ({children, className}: BoxProps): JSX.Element => <div className={cn('box', className)}>{children}</div>;

export const BoxHeader = ({children, className}: BoxProps): JSX.Element => <div className={cn('box-header', className)}>{children}</div>;

export const BoxTitle = ({children}: BoxProps): JSX.Element => <h2 className='box-title'>{children}</h2>;
