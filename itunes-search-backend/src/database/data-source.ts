import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();

const isCompiled = __filename.endsWith('.js');
const extension = isCompiled ? 'js' : 'ts';

const entitiesPath = path.join(__dirname, `../**/*.entity.${extension}`);
const migrationsPath = path.join(__dirname, `./migrations/*.${extension}`);

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
  synchronize: false,
  migrationsRun: false,

  logging:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'schema', 'warn']
      : ['error'],

  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : undefined,
});

export default AppDataSource;
