import {DeepReadonlyObject} from './utils/deepReadOnly';

export const config = Object.freeze({
  port: Number(process.env.PORT) || 3000,
  database: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres@localhost:5433/sbs_mvp'
  },
  bigchaindbUrl: process.env.BIGCHAINDB_URL || 'https://test.ipdb.io/api/v1/',
  sendgridApiKey: process.env.SENDGRID_API_KEY || 'SG.553',
  fromEmailAddress: process.env.FROM  || 'SBS@s1seven.com'
});

export type Config = DeepReadonlyObject<typeof config>;
