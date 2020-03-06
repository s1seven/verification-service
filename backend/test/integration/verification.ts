import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {config} from '../../src/config';
import {buildApp} from '../../src/app';
import {Express} from 'express';

chai.use(chaiHttp);

describe('Integration Verification', () => {
  let app: Express;

  before(async () => {
    app = buildApp(config);
  });

  describe('uploading files', () => {
    it('works correctly when hash was not notarized', async () => {
      const result = await chai.request(app).get('/api/verify/324239412312').send();
      expect(result.body).to.deep.equal({
        isVerified: false
      });
    });
  });
});
