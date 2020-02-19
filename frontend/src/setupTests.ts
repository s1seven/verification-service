import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

process.env.REACT_APP_API_URL = 'http://test.com';

configure({adapter: new Adapter()});

// Fixes issue: https://github.com/testing-library/react-testing-library/issues/281
const originalConsoleError = console.error;
console.error = (...args: string[]) => {
  if (/Warning.*not wrapped in act/.test(args[0])) {
    return;
  }
  originalConsoleError(...args);
};
