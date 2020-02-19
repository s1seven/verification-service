import nock from 'nock';
import {ApiService} from '../../services/apiService';

describe('API Service', () => {
  const apiUrl = 'http://url.com/api';
  const apiService = new ApiService(apiUrl);
  const mockServer = nock(apiUrl).defaultReplyHeaders({'access-control-allow-origin': '*'});

  const replyWithError = () => {
    mockServer
      .post(/.*/)
      .reply(400, {reason: 'post error'});
    mockServer
      .get(/.*/)
      .reply(400, {reason: 'get error'});
  };

  describe('upload', () => {
    it('composes form data with file at the "file" field', async () => {
      const file = new File(['uploadedFileContent'], 'filename');
      const expectedForm = new FormData();
      expectedForm.append('file', file, 'filename');

      const scope = mockServer
        .post('/notarize', /form-data; name="file".[^]*uploadedFileContent/m)
        .reply(201, {charge: 'file'});

      expect(await apiService.upload(file)).toEqual({charge: 'file'});
      expect(scope.isDone()).toBe(true);
    });

    it('throws error when response status is not 201', async () => {
      replyWithError();
      await expect(apiService.upload(new File([], ''))).rejects.toEqual(new Error('post error'));
    });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.restore();
  });
});
