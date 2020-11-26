import {ApiService} from './apiService';

export class VerificationService {
  constructor(private apiService: ApiService) { }

  async verify(file: File) {
    const hash = await this.calculateHashOfFile(file);
    return this.apiService.verify(hash);
  }

  private async calculateHashOfFile(file: File) {
    const buffer = await this.readFile(file);
    const hash = await crypto.subtle.digest('SHA-256', buffer);
    return Array
      .from(new Uint8Array(hash))
      .map((val) => val.toString(16).padStart(2, '0'))
      .join('');
  }

  private readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const readFileCallback = () => {
        const {result} = reader;
        if (result === null) {
          reject(new Error('File read error'));
        } else if (typeof result === 'string') {
          resolve(Buffer.from(result));
        } else {
          resolve(result);
        }
      };

      reader.addEventListener('load', readFileCallback);
      reader.readAsArrayBuffer(file);
    });
  }
}
