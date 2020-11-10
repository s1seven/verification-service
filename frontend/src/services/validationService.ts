import {Result} from '@restless/sanitizers';
import {validate} from '@s1seven/schema-tools-validate';
import flatten from 'lodash.flatten';

export const validateCertificateFile = async (file: File) => {
  try {
    const certificateInput = await readFileAsString(file);
    return await validateCertificateInput(JSON.parse(certificateInput), '');
  } catch (err) {
    throw new Error(`expected: certificate, path: ""`);
  }
};

const validateCertificateInput = async (value: Record<string, any> | string, path: string) => {
  const errors = await validate(value);

  if (Object.keys(errors).length) {
    const resultError = flatten(
      Object.values(errors).map((error) => error.map((error) => ({
        path: `${path}${error.path}`,
        expected: error.expected || ''
      })))
    );
    return Result.error(resultError);
  };
  return Result.ok(value);
};

const readFileAsString = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  const readFile = () => {
    const {result} = reader;
    if (typeof result !== 'string') {
      reject(new Error('File read error'));
    } else {
      resolve(result);
    }
  };

  reader.addEventListener('loadend', readFile);
  reader.readAsText(file);
});
