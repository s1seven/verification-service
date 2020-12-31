import React from 'react';
import {Verification} from './Verification';
import {Footer} from './Footer';

export const Dashboard = (): JSX.Element  => (
  <div className='dashboard'>
    <Verification/>
    <Footer/>
  </div>
);
