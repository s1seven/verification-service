import {
  BigchainDbCreateTransaction,
  BigchainDbWrapper
} from './bigchainDbWrapper';
import {Attestation, Verification} from 'verification-service-common/models';

export class VerificationService {
  constructor(
    private bigchainDbWrapper: BigchainDbWrapper,
    private notarizationPrefix: string = 'SBS Notarized:'
  ) {}

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

  async validate(fileHash: string): Promise<Verification> {
    //? Remove PREFIX in findAsset to have more accurate results
    const PREFIX = this.notarizationPrefix;
    const hash = fileHash.toLowerCase();
    const assets = await this.bigchainDbWrapper.findAsset(
      `${PREFIX}${hash}`
    );
    const asset = assets.length ? assets.find(
      (asset) => asset.data && (asset.data as any).notarization === `${PREFIX}${hash}`
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
