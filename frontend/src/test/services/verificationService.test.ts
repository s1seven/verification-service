import {VerificationService} from '../../services/verificationService';
import fs from 'fs';

const file = (content: string | Buffer) => new File([content], 'file.txt');
const certificateFixtureParh = `${__dirname}/../../../../backend/test/fixtures/certificate.json`;
const certificateText = fs.readFileSync(certificateFixtureParh).toString();

describe('Verification Service', () => {
  const mockApiService = {
    verify: jest.fn()
  };
  const verificationService = new VerificationService(mockApiService as any);

  it('calculates SHA-256 of file and verifies it on backend', async () => {
    const certificateFile = file(certificateText);
    await verificationService.verify(certificateFile);
    expect(mockApiService.verify).toBeCalledWith('d20f2ac317d3664ead26cae00373d1cc334643e10cf456025cb6a5ac950c7009');
  });
});
