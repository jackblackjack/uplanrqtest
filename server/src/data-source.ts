import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'POSTGRES_USER',
  password: 'POSTGRES_PASSWORD',
  database: 'test_db',
  entities: [__dirname + '/entities/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrationsTransactionMode: 'all',
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};
