import React from 'react';
import Logo1x from '../../assets/steelButSmart@1x.png';
import Logo2x from '../../assets/steelButSmart@2x.png';

export const Footer = () => (
  <footer>
    <div className='logo'>
      <p className='logo-text'>Powered by</p>
      <img className='logo-image' src={Logo1x} srcSet={Logo2x} alt='logo'/>
    </div>
  </footer>
);
