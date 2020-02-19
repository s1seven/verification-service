import {asArray, asObject, asString} from '@restless/sanitizers';

export const asSanitizerFailures = asObject({
  reason: asArray(asObject({
    path: asString,
    expected: asString
  }))
});
