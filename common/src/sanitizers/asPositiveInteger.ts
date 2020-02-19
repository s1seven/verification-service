import {asChecked, asInteger, Sanitizer, withErrorMessage} from '@restless/sanitizers';

export const asPositiveInteger: Sanitizer<number> = withErrorMessage(asChecked(asInteger, (value) => value > 0), 'positive integer');

