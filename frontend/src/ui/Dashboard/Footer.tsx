import React from 'react';
import Logo1x from '../../assets/s1seven@1x.png';
import Logo2x from '../../assets/s1seven@2x.png';
import {useServices} from '../hooks/useServices';

export const Footer = (): JSX.Element  => {
  const {bigchainService} = useServices();

  return (
    <footer>
      <div className='logo'>
        <div>
          <p className='logo-text'>Powered by
            <a href='https://en10204.io/' className='en10204-link'> en10204.io</a>
          </p>
        </div>
        <img className='logo-image' src={Logo1x} srcSet={Logo2x} alt='logo'/>
      </div>
      <div>
        <p className='connected-text'>
          Connected to <a href={bigchainService.bigchainUrl.href} className='bcdb-link'>{bigchainService.hostname}</a>
        </p>
      </div>
    </footer>
  );
};
