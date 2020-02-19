import {Sanitizer, Schema, Result, asObject} from '@restless/sanitizers';

export const asExactObject = <T extends object> (schema: Schema<T>): Sanitizer<T> => (value, path) => {
  const asObjectResult = asObject(schema)(value, path);
  if (!Result.isOk(asObjectResult)) {
    return asObjectResult;
  }
  const expectedKeys = new Set(Object.keys(schema));
  const unexpectedKeys = Object.keys(value as object).filter((key) => !expectedKeys.has(key));
  if (unexpectedKeys.length > 0) {
    return Result.error(unexpectedKeys.map((key) => ({path: `${path}.${key}`, expected: 'absent'})));
  }
  return asObjectResult;
};
