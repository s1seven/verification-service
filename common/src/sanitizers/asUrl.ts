import {asMatching} from '@restless/sanitizers';

export const asUrl = asMatching(/^\S+\.\S{2,}$/i, 'url');
