import {
  BigchainDbCreateTransaction,
  BigchainDbWrapper
} from './bigchainDbWrapper';
import {Verification} from 'verification-service-common/models';

export class VerificationService {
  constructor(private bigchainDbWrapper: BigchainDbWrapper) {}

  async validate(hash: string): Promise<Verification> {
    const assets = await this.bigchainDbWrapper.findAsset(
      `SBS Notarized:${hash}`
    );
    if (
      !assets.length ||
      (assets[0].data as any).notarization !== `SBS Notarized:${hash}`
    ) {
      return {isVerified: false};
    }
    const transaction = await this.bigchainDbWrapper.getTransaction(
      assets[0].id
    );
    const [creatorPublicKey] = transaction.outputs[0].public_keys;
    const attestations = await this.bigchainDbWrapper.findAsset(
      creatorPublicKey
    );

    let attestation: Record<string, unknown> | null = null;
    if (attestations.length) {
      const {id: attestationId} =
        attestations.find(
          (attest: any) =>
            attest.data && attest.data.publicKey === creatorPublicKey
        ) || {};
      if (attestationId) {
        const tx = (await this.bigchainDbWrapper.getTransaction(
          attestationId
        )) as BigchainDbCreateTransaction<unknown>;

        attestation = {
          ...((tx.asset.data as Record<string, unknown>) || {}),
          link: this.bigchainDbWrapper.transactionLink(tx)
        };
      }
    }

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
