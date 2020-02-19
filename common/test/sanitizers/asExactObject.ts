import {expect} from 'chai';
import {asNumber, asObject, asString, Result} from '@restless/sanitizers';
import {asExactObject} from '../../src/sanitizers/asExactObject';

describe('AsExactObject', () => {
  const asMyObject = asExactObject({
    str: asString,
    num: asNumber,
    obj: asObject({
      foo: asNumber,
      bar: asString
    })
  });
  const correctObject = {
    str: 'aaa',
    num: 10,
    obj: {foo: 12, bar: 'asd'}
  };

  it('sanitizes correct objects', () => {
    expect(asMyObject(correctObject, '')).to.deep.equal(Result.ok(correctObject));
  });

  it('returns error when null or undefined passed', async () => {
    expect(asMyObject(null, 'path')).to.deep.equal(Result.error([{
      path: 'path', expected: 'object'
    }]));
    expect(asMyObject(undefined, 'path')).to.deep.equal(Result.error([{
      path: 'path', expected: 'object'
    }]));
  });

  it('returns errors when finds unexpected fields', () => {
    expect(asMyObject({...correctObject, newField: 0, field: null}, 'path'))
      .to.deep.equal(Result.error([
        {path: 'path.newField', expected: 'absent'},
        {path: 'path.field', expected: 'absent'}
      ]));
  });
});
