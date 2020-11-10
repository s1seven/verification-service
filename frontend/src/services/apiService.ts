import {Verification} from 'verification-service-common/models';
import {asSanitizerFailures, formatSanitizerError} from 'verification-service-common/sanitizers';
import {Result, SanitizerFailure} from '@restless/sanitizers';


export class BadRequestError extends Error {
  public constructor(public sanitizerFailures: SanitizerFailure[]) {
    super(formatSanitizerError(sanitizerFailures));
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

const getError = (response: any) => {
  const isSanitizerFailure = asSanitizerFailures(response, '');
  if (Result.isOk(isSanitizerFailure)) {
    throw new BadRequestError(isSanitizerFailure.ok.reason);
  }
  throw new Error(response.reason);
};

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

const safeFetch = async (...args: ArgumentTypes<typeof fetch>) => {
  const response = await fetch(...args);
  const body = await response.json();
  if (!response.ok) {
    getError(body);
  }
  return body;
};

interface RenderCertificateResult {
  certificateHtml: string;
}

export class ApiService {
  public constructor(private readonly apiUrl: string) { }

  public async verify(fileHash: string): Promise<Verification> {
    return safeFetch(`${this.apiUrl}/verify/${fileHash}`);
  }

  async renderCertificate(file: File): Promise<RenderCertificateResult> {
    const form = new FormData();
    form.append('certificate', file, file.name);

    return safeFetch(`${this.apiUrl}/renderCertificate`, {
      method: 'POST',
      body: form
    });
  }
}
