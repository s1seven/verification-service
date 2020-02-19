import {expect} from 'chai';
import {asEmailAddress} from '../../src/sanitizers/asEmailAddress';
import {Result} from '@restless/sanitizers';

describe('asEmailAddress', () => {
  [
    'mars@ww.pl',
    'snikers@twix.com',
    'kit.kat@milka.org',
    'w_w@milka.org'
  ].forEach((email) => {
    it(`marks ${email} as correct`, () => {
      expect(asEmailAddress(email, '')).to.deep.equal({ok: email});
    });
  });

  [
    '@ww.pl',
    'snikers@twixcom',
    'kit.katmilka.org',
    'w_w@.org',
    'w_w@aaa.',
    ' @ . ',
    'asd asd@wp.pl',
    'asd@asd asd.ps',
    'aaa@aa.aa      '
  ].forEach((email) => {
    it(`marks ${email} as incorrect`, () => {
      expect(asEmailAddress(email, '')).to.deep.equal(Result.error([
        {path: '', expected: 'e-mail address'}
      ]));
    });
  });
});
