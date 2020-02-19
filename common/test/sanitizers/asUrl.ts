import {expect} from 'chai';
import {Result} from '@restless/sanitizers';
import {asUrl} from '../../src/sanitizers/asUrl';

describe('asUrl', () => {
  [
    'http://aaa.bb',
    'www.aaa.bb',
    'wwwaaa.bb',
    'test.gov.no'
  ].forEach((url) => it(`sanitizes ${url}`, async () => {
    expect(asUrl(url, '')).to.deep.equal(Result.ok(url));
  }));

  [
    '.com',
    'google.c',
    ' aaa.bb',
    'aaa.bb '
  ].forEach((badUrl) => it(`returns error for ${badUrl}`, async () => {
    expect(asUrl(badUrl, 'path')).to.deep.equal(Result.error([{
      expected: 'url',
      path: 'path'
    }]));
  }));
});
