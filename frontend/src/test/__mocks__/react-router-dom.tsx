import React from 'react';
import rrd from 'react-router-dom';

// eslint-disable-next-line react/display-name
(rrd as any).BrowserRouter = ({children}: any) => <div>{children}</div>;
module.exports = rrd;
