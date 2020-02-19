import {asMatching} from '@restless/sanitizers';

export const asPublicKey = asMatching(/^[a-z0-9]{44}$/i, 'bigchainDB public key');
