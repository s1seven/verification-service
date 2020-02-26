import {DeepReadonlyObject} from './utils/deepReadOnly';

export const config = Object.freeze({
  port: Number(process.env.PORT) || 3000,
  bigchaindbUrl: process.env.BIGCHAINDB_URL || 'https://test.ipdb.io/api/v1/'
});

export type Config = DeepReadonlyObject<typeof config>;
