import {expect} from 'chai';
import {formatSanitizerError} from '../../src/sanitizers';

const errors = [{path: 'path', expected: 'expected'}, {path: 'path2', expected: 'expected2'}];

describe('formatSanitizerError', () => {
  it('correctly formats errors returned by a sanitizer', () => {
    const res = formatSanitizerError(errors);
    expect(res).to.be.equal(`Expected path to be expected.
Expected path2 to be expected2.`
    );
  });
});
