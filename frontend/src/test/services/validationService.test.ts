import {Result} from '@restless/sanitizers';
import fs from 'fs';
import {validateCertificateFile} from '../../services/validationService';

const file = (content: string | Buffer) => new File([content], 'file.txt');
const certificateFixtureParh = `${__dirname}/../../../../backend/test/fixtures/certificate.json`;
const certificateText = fs.readFileSync(certificateFixtureParh).toString();

describe('validateCertificateFile', () => {
  it('validates correct certificate', async () => {
    const certificateFile = file(certificateText);
    expect(await validateCertificateFile(certificateFile))
      .toStrictEqual(Result.ok(JSON.parse(certificateText)));
  });

  it('does not validate incorrect certificate', async () => {
    let expectedError;
    try {
      await validateCertificateFile(file('some file'));
    } catch (error) {
      expectedError = error;
    }
    expect(expectedError.message).toEqual(`expected: certificate, path: ""`);
  });
});
