import {expect} from 'chai';
import {asPositiveInteger} from '../../src/sanitizers/asPositiveInteger';
import {Result} from '@restless/sanitizers';

describe('asPositiveInteger', () => {
  it('sanitizes strings containing positive integer numbers', async () => {
    const result = asPositiveInteger('123', '');
    expect(result).to.deep.equal(Result.ok(123));
  });

  it('does not accept strings containing negative numbers', async () => {
    const result = asPositiveInteger('-123', 'path');
    expect(result).to.deep.equal(Result.error([{path: 'path', expected: 'positive integer'}]));
  });

  it('does not accept strings containing float numbers', async () => {
    const result = asPositiveInteger('123.5', 'path');
    expect(result).to.deep.equal(Result.error([{path: 'path', expected: 'positive integer'}]));
  });

  it('does not accept non-number strings', async () => {
    const result = asPositiveInteger('12abc', 'path');
    expect(result).to.deep.equal(
      Result.error([{path: 'path', expected: 'positive integer'}])
    );
  });

  it('sanitizes integer numbers', async () => {
    const result = asPositiveInteger(123, '');
    expect(result).to.deep.equal(Result.ok(123));
  });

  it('does not accepts float numbers', async () => {
    const result = asPositiveInteger(123.5, 'path');
    expect(result).to.deep.equal(Result.error([{path: 'path', expected: 'positive integer'}]));
  });

  it('does not accepts negative numbers', async () => {
    const result = asPositiveInteger(-123, 'path');
    expect(result).to.deep.equal(Result.error([{path: 'path', expected: 'positive integer'}]));
  });

  it('does not accept NaN', async () => {
    const result = asPositiveInteger(NaN, 'path');
    expect(result).to.deep.equal(
      Result.error([{path: 'path', expected: 'positive integer'}])
    );
  });

  it('does not accept types other than number or string', async () => {
    const result = asPositiveInteger(true, 'path');
    expect(result).to.deep.equal(
      Result.error([{path: 'path', expected: 'positive integer'}])
    );
  });
});
