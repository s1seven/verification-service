import {expect} from 'chai';
import {asChargeCertificate} from '../../src/sanitizers';
import chargeCertificate from '../../fixtures/chargeCertificate.json';
import chargeCertificateFull from '../../fixtures/chargeCertificateFull.json';
import {Result} from '@restless/sanitizers';

describe('AsChargeCertificate', () => {
  it('should sanitize short certificate', async () => {
    expect(asChargeCertificate(chargeCertificate, '')).to.deep.equal(Result.ok(chargeCertificate));
  });

  it('should sanitize full certificate', async () => {
    expect(asChargeCertificate(chargeCertificateFull, '')).to.deep.equal(Result.ok(chargeCertificateFull));
  });

  it('returns error when Certificate is missing', async () => {
    expect(asChargeCertificate({}, 'path')).to.deep.equal(Result.error(
      [{expected: `should have required property 'Certificate'`, path: 'path'}]
    ));
  });

  ['A01', 'B07-1'].forEach((field) =>
    it(`returns error when Certificate.${field} is missing`, async () => {
      const brokenCert = {Certificate: {...chargeCertificateFull.Certificate, [field]: undefined}};
      expect(asChargeCertificate(brokenCert, 'path')).to.deep.equal(Result.error(
        [{expected: `should have required property '${field}'`, path: 'path.Certificate'}]
      ));
    })
  );

  it('returns error when additional fields have unexpected format', async () => {
    const brokenCert = {Certificate: {...chargeCertificateFull.Certificate, Z05: {key: '1'}}};
    expect(asChargeCertificate(brokenCert, 'path')).to.deep.equal(Result.error(
      [{expected: `should have required property 'value'`, path: `path.Certificate['Z05']`}]
    ));
  });
});
