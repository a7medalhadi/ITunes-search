import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';

  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    // ssl confif - only for production
    ...(isProduction && {
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    extra: {
      max: 20,
      min: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },

    autoLoadEntities: true,

    synchronize: false,

    logging: isDevelopment ? ['error', 'warn', 'schema'] : ['error'],

    // I always prefer to run the migration manually as deployment step.
    migrationsRun: false,
  };

  return options;
};
