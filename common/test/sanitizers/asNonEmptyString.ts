import {expect} from 'chai';
import {asNonEmptyString} from '../../src/sanitizers/asNonEmptyString';
import {Result} from '@restless/sanitizers';

describe('AsNonEmptyString', () => {
  it('sanitizes non empty string', () => {
    expect(asNonEmptyString('string', '')).to.deep.equal(Result.ok('string'));
  });

  [
    '',
    123,
    {}
  ].forEach((badValue) => it(`fails to sanitize ${badValue}`, () => {
    expect(asNonEmptyString(badValue, 'path')).to.deep.equal(Result.error([{
      path: 'path',
      expected: 'a not empty string'
    }]));
  }));
});
