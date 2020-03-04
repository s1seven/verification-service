import React from 'react';
import Logo1x from '../../assets/steelButSmart@1x.png';
import Logo2x from '../../assets/steelButSmart@2x.png';
import {useServices} from '../hooks/useServices';

export const Footer = () => {
  const {bigchainService} = useServices();

  return (
    <footer>
      <div className='logo'>
        <p className='logo-text'>Powered by</p>
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
