import {ApiService} from './apiService';

export class RenderService {
  constructor(private apiService: ApiService) { }

  async renderCertificate(file: File) {
    return this.apiService.renderCertificate(file);
  }
}
