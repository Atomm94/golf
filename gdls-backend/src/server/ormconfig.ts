import 'dotenv/config'
import 'reflect-metadata';

import env from 'env-var';

const DATABASE_TYPE = env.get('DATABASE_TYPE').default('postgres').asString();
const DATABASE_SYNCHRONIZE = env.get('DATABASE_SYNCHRONIZE').default('false').asBoolStrict();
const DATABASE_LOGGING = env.get('DATABASE_LOGGING').default('false').asString();
const DATABASE_URL = env.get('DATABASE_URL').required().asString();

export const connectionOptions: any = {
  entities: ['build/**/models/*.js'],
  type: DATABASE_TYPE,
  synchronize: DATABASE_SYNCHRONIZE,
  logging: DATABASE_LOGGING,
  migrations: ['build/migrations/**.js'],
  cli: {
    migrationsDir: 'build/migrations',
  },
  "extra": {
  },
  url: DATABASE_URL,
};

const FORCE_DB_SSL = env.get('FORCE_DB_SSL').default('false').asBoolStrict();

if (FORCE_DB_SSL) {
  connectionOptions.extra = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}
