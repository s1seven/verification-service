import {BigchainDbWrapper} from './bigchainDbWrapper';
import {Verification} from 'verification-service-common/models';

export class VerificationService {
  constructor(private bigchainDbWrapper: BigchainDbWrapper) {}

  async validate(hash: string): Promise<Verification> {
    const transactions = await this.bigchainDbWrapper.findAsset(`SBS Notarized:${hash}`);
    if (transactions.length === 0 || (transactions[0].data as any).notary !== `SBS Notarized:${hash}`) {
      return {isVerified: false};
    }
    const transaction = await this.bigchainDbWrapper.getTransaction(transactions[0].id);
    return {
      isVerified: true,
      creator: transaction.outputs[0].public_keys[0],
      timestamp: transaction.metadata.timestamp,
      id: transaction.id,
      link: this.bigchainDbWrapper.transactionLink(transaction)
    };
  }
}
