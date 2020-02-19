import {ApiService} from './apiService';

export class NotarizationService {
  constructor(private apiService: ApiService) {}

  async notarize(file: File) {
    return this.apiService.upload(file);
  }
}
