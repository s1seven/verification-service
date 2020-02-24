import {expect} from 'chai';
import {BigchainDbWrapper} from '../../src/services/bigchainDbWrapper';
import {config} from '../../src/config';
import {Transaction} from 'bigchaindb-driver';

describe('Bigchain DB Wrapper', () => {
  const bigchainDbWrapper = new BigchainDbWrapper(config.bigchaindbUrl);
  const keyPair = {
    privateKey: 'HXKbwZ1wn1zgcxeBa9JKjZon7myr1FyUVAxutvuK4Kxu',
    publicKey: '6MXbQupMW6Vxy95b6DrVYB17bBudJTXG2KyT7Q3gk8iS'
  };
  const upload = async (assetText: string) => {
    const rawTransaction = Transaction.makeCreateTransaction(
      {text: assetText},
      {foo: 'bar'},
      [Transaction.makeOutput(Transaction.makeEd25519Condition(keyPair.publicKey))],
      keyPair.publicKey
    );
    const signedTransaction = Transaction.signTransaction(rawTransaction, keyPair.privateKey);
    return (bigchainDbWrapper as any).connection.postTransactionCommit(signedTransaction);
  };

  it('returns empty list when no assets are found', async () => {
    expect(await bigchainDbWrapper.findAsset('foo')).to.deep.equal([]);
  });

  it('finds assets on bigchain', async () => {
    const assetDate = Date.now().toString();
    const {id} = await upload(assetDate);
    expect(await bigchainDbWrapper.findAsset(assetDate)).to.deep.equal([{
      data: {text: assetDate},
      id
    }]);
  });

  it('transaction link returns link of transaction', () => {
    expect(bigchainDbWrapper.transactionLink({id: '123'} as any)).to.equal('http://localhost:9984/api/v1/transactions/123');
  });
});
