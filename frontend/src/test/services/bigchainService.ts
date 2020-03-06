import {BigchainService} from '../../services/bigchainService';

describe('BigchainService', () => {
  it('gets hostname from bigchain api url', () => {
    expect(new BigchainService('https://test.ipdb.io/api/v1/').hostname).toBe('test.ipdb.io');
  });
});
