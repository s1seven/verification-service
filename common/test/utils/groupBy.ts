import {expect} from 'chai';
import {groupBy} from '../../src/utils';

describe('GroupBy', () => {
  const exampleData = [1.2, 3.4, 1, 2.5, 5, 3.4];

  it('groups list by callback result and returns list of key-value pairs', async () => {
    expect(groupBy(exampleData, Math.floor)).to.deep.equal([{key: '1', value: [1.2, 1]}, {key: '2', value: [2.5]}, {key: '3', value: [3.4, 3.4]}, {key: '5', value: [5]}]);
  });
});
