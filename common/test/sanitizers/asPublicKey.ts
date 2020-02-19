import {expect} from 'chai';
import {asPublicKey} from '../../src/sanitizers/asPublicKey';
import {Result} from '@restless/sanitizers';

describe('asPublicKey', () => {
  it('sanitizes public keys', () => {
    expect(asPublicKey('8p9WjnBvnHorkd6Qn61ij4FT7saWsLhdcWDBGf77FxZu', '')).to.deep.equal(Result.ok('8p9WjnBvnHorkd6Qn61ij4FT7saWsLhdcWDBGf77FxZu'));
  });

  [
    '8p9WjnBvnHorkd6Qn61ij4FT7saWsLhdcWDBGf77Fx  ',
    '8p9WjnBvnHorkd6Qn61ij4FT7saWsLhdcWDBGf77FxZ',
    '8p9WjnBvnHorkd6Qn61ij4FT7saWsLhdcWDBGf77FxZu1'
  ].forEach((badKey) => it(`returns error for ${badKey}`, async () => {
    expect(asPublicKey(badKey, 'path')).to.deep.equal(Result.error([{
      expected: 'bigchainDB public key',
      path: 'path'
    }]));
  }));
});
