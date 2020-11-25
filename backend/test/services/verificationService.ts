import {expect} from 'chai';
import sinon from 'sinon';
import {VerificationService} from '../../src/services/verificationService';
import {makeExampleTransaction} from '../mocks';

describe('VerificationService', () => {
  const setup = function () {
    const mockBigchain = {
      findAsset: sinon
        .stub()
        .resolves([
          {id: '123', data: {notarization: 'SBS Notarized:0x123'}}
        ]),
      getTransaction: sinon
        .stub()
        .callsFake((id) =>
          makeExampleTransaction(id, 'PubKey', ['PubKey'], '10')
        ),
      transactionLink: sinon.stub().returns('http://bigchain.com')
    };
    const verificationService = new VerificationService(mockBigchain as any);
    return {mockBigchain, verificationService};
  };

  it('shows verification info when finds asset with provided hash', async () => {
    const {mockBigchain, verificationService} = setup();

    expect(await verificationService.validate('0x123')).to.deep.equal({
      isVerified: true,
      attestation: null,
      creator: 'PubKey',
      timestamp: '10',
      id: '123',
      link: 'http://bigchain.com'
    });
    expect(mockBigchain.findAsset).to.be.calledWith('SBS Notarized:0x123');
  });

  it('returns that file is not verified when it was not found', async () => {
    const {mockBigchain, verificationService} = setup();

    mockBigchain.findAsset.resolves([]);
    expect(await verificationService.validate('0x123')).to.deep.equal({
      isVerified: false
    });
  });

  it('returns that file is not verified when bichain returns something we were not searching', async () => {
    const {verificationService} = setup();

    expect(await verificationService.validate('0x345')).to.deep.equal({
      isVerified: false
    });
  });
});
