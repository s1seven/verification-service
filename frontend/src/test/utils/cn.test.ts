import {cn} from '../../utils/cn';

describe('Cn', () => {
  it('concatenates strings with spaces', async () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('skips undefined parameters', async () => {
    expect(cn('a', undefined, 'c')).toBe('a c');
  });
});
