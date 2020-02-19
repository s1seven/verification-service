import {SanitizerFailure} from '@restless/sanitizers';

export const formatSanitizerError = (errors: SanitizerFailure[]) => errors.map(({path, expected}) => `Expected ${path} to be ${expected}.`).join('\n');
