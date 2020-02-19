import {asMatching} from '@restless/sanitizers';

export const asEmailAddress = asMatching(/^\S+@\S+\.\S+$/, 'e-mail address');
