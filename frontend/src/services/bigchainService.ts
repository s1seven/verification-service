export class BigchainService {
  public readonly bigchainUrl: URL;
  constructor(bigchainUrl: string) {
    this.bigchainUrl = new URL(bigchainUrl);
  }

  get hostname(): string {
    return this.bigchainUrl.hostname;
  }
}
