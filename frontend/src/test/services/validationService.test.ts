import {Result} from '@restless/sanitizers';
import fs from 'fs';
import {validateCertificateFile} from '../../services/validationService';

const file = (content: string | Buffer) => new File([content], 'file.txt');
const certificateFixturePath = `${__dirname}/../../../../backend/test/fixtures/certificate.json`;
const certificateText = fs.readFileSync(certificateFixturePath).toString();

describe('validateCertificateFile', () => {
  it('validates correct certificate', async () => {
    const certificateFile = file(certificateText);
    expect(await validateCertificateFile(certificateFile))
      .toStrictEqual(Result.ok(JSON.parse(certificateText)));
  }, 7000);

  it('does not validate incorrect certificate', async () => {
    const validationResult = await validateCertificateFile(file('some file')) as { error: any};
    expect(validationResult.error.message).toEqual('Unexpected token s in JSON at position 0');
  });
});
