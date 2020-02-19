import {asChecked, asString, withErrorMessage} from '@restless/sanitizers';

export const asNonEmptyString = withErrorMessage(asChecked(asString, (value) => value.length > 0), 'a not empty string');
