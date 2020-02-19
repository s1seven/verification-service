import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {config} from '../../src/config';
import {buildApp} from '../../src/app';
import {Express} from 'express';
import chargeCertificateFile from 'verification-service-common/fixtures/chargeCertificate.json';

chai.use(chaiHttp);

describe('Integration Notarization', () => {
  let app: Express;

  before(async () => {
    app = buildApp(config);
  });

  const uploadFile = () => chai.request(app)
    .post('/api/notarize')
    .attach('file', '../common/fixtures/chargeCertificate.json');

  describe('uploading files', () => {
    it('After uploading a file should return id of the charge upload record', async () => {
      const result = await uploadFile();

      expect(result.status).to.equal(200);
      expect(JSON.parse(result.body.file)).to.deep.equal(chargeCertificateFile);
    });
  });
});
