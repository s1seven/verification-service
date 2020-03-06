export class BigchainService {
  public readonly bigchainUrl: URL;
  constructor(bigchainUrl: string) {
    this.bigchainUrl = new URL(bigchainUrl);
  }

  get hostname() {
    return this.bigchainUrl.hostname;
  }
}
