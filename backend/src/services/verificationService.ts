import {BigchainDbWrapper} from './bigchainDbWrapper';
import {Attestation, Verification} from 'verification-service-common/models';
export class VerificationService {
  constructor(private bigchainDbWrapper: BigchainDbWrapper) {}

  async getAttestation(publicKey: string): Promise<Attestation | null> {
    const results = await this.bigchainDbWrapper.findMetadata(publicKey);
    let attestation: Attestation | null = null;
    if (results.length) {
      const {id} =
        results.find(
          (result) =>
            Object.prototype.hasOwnProperty.call(
              result.metadata,
              'publicKey'
            ) && result.metadata.publicKey === publicKey
        ) || {};
      if (id) {
        const tx = await this.bigchainDbWrapper.getTransaction(id);
        const assetId = this.bigchainDbWrapper.getAssetId(tx);
        // TODO: list transaction history ?
        // const transactions = await this.bigchainDbWrapper.listTransactions(assetId);

        attestation = {
          ...(((tx.metadata as unknown) as Attestation) || {}),
          link: this.bigchainDbWrapper.transactionLink(tx),
          assetId
        };
      }
    }
    return attestation;
  }

  async validate(fileHash: string): Promise<Verification> {
    const hash = fileHash.toLowerCase();
    const assets = await this.bigchainDbWrapper.findAsset(hash);
    const asset = assets.length
      ? assets.find(
        (asset) =>
          asset.data &&
            (asset.data.jsonHash === hash || asset.data.pdfHash === hash)
      )
      : null;

    if (!asset) {
      return {isVerified: false};
    }
    const transaction = await this.bigchainDbWrapper.getTransaction(asset.id);
    const [creatorPublicKey] = transaction.outputs[0].public_keys;
    const attestation = await this.getAttestation(creatorPublicKey);

    return {
      isVerified: true,
      attestation,
      creator: creatorPublicKey,
      timestamp: transaction.metadata.timestamp,
      id: transaction.id,
      link: this.bigchainDbWrapper.transactionLink(transaction)
    };
  }
}
