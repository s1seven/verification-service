/* eslint-disable @typescript-eslint/no-unused-vars */
import {ApiService, RenderCertificateResult} from './apiService';
export class RenderService {
  constructor(private apiService: ApiService) { }

  async renderCertificate(file: File): Promise<RenderCertificateResult> {
    return this.apiService.renderCertificate(file);
  }
}
