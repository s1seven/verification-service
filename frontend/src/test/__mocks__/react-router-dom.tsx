import React from 'react';
import rrd from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line react/display-name
rrd.BrowserRouter = ({children}: any) => <div>{children}</div>;
module.exports = rrd;
