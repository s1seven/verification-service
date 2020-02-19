import {asBoolean} from '@restless/sanitizers';
import {asExactObject} from './asExactObject';
import {asPublicKey} from './asPublicKey';
import {asUrl} from './asUrl';
import {asNonEmptyString} from './asNonEmptyString';

export const asCompany = asExactObject({
  vatId: asNonEmptyString,
  name: asNonEmptyString,
  publicKey: asPublicKey,
  receiveByEmail: asBoolean,
  url: asUrl
});
