import {VerificationService} from '../../services/verificationService';

describe('Verification Service', () => {
  const mockApiService = {
    verify: jest.fn()
  };
  const verificationService = new VerificationService(mockApiService as any);

  it('calculates SHA-256 of file and verifies it on backend', async () => {
    const file = new File(['uploadedFileContent'], 'filename');
    await verificationService.verify(file);
    expect(mockApiService.verify).toBeCalledWith('24bff064c4e5e834ee4498924de1e83144690dd2e3aef3248790195668a7b14c');
  });
});
