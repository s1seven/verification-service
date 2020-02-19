import {expect} from 'chai';
import {toGram} from 'verification-service-common/utils';

describe('Unit Conversions', () => {
  describe('toGram', () => {
    it('works with g', async () => {
      expect(toGram('42.69', 'g')).to.equal(42.69);
      expect(toGram('42,69', 'g')).to.equal(42.69);
    });

    it('works with kg', async () => {
      expect(toGram('42.69', 'kg')).to.equal(42690);
      expect(toGram('42,69', 'kg')).to.equal(42690);
    });

    it('works with t', async () => {
      expect(toGram('42.69', 't')).to.equal(42690000);
      expect(toGram('42,69', 't')).to.equal(42690000);
    });

    it('throws with different units', async () => {
      expect(() => toGram('42.69', 'oz')).to.throw('Unknown weight unit: oz');
    });
  });
});
