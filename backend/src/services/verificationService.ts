import {
  BigchainDbCreateTransaction,
  BigchainDbWrapper
} from './bigchainDbWrapper';
import {Attestation, Verification} from 'verification-service-common/models';

export class VerificationService {
  constructor(private bigchainDbWrapper: BigchainDbWrapper) {}

  async getAttestation(publicKey: string): Promise<Attestation | null> {
    const attestations = await this.bigchainDbWrapper.findAsset(publicKey);
    let attestation: Attestation | null = null;
    if (attestations.length) {
      const {id: attestationId} =
        attestations.find(
          (attest: any) => attest.data && attest.data.publicKey === publicKey
        ) || {};
      if (attestationId) {
        const tx = (await this.bigchainDbWrapper.getTransaction(
          attestationId
        )) as BigchainDbCreateTransaction<unknown>;

        attestation = {
          ...((tx.asset.data as Attestation) || {}),
          link: this.bigchainDbWrapper.transactionLink(tx)
        };
      }
    }
    return attestation;
  }

  async validate(hash: string): Promise<Verification> {
    // Removed prefix to have more accurate results `SBS Notarized:${hash}`
    const assets = await this.bigchainDbWrapper.findAsset(
      hash
    );
    const asset = assets.length ? assets.find(
      (asset) => (asset.data as any).notarization === `SBS Notarized:${hash}`
    ) : null;

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
