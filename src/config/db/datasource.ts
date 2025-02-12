import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USER || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DB,
  synchronize: false, // set to process.env.NODE_ENV === 'development' if you want to synchronize the database
  logging: false, // set to true if you want to see the queries in the console
  entities: [join(__dirname, '../../models/**/*.ts')],
  migrations: [join(__dirname, '../../config/db/migrations/**/*.ts')],
  subscribers: [join(__dirname, '../../config/db/subscribers/**/*.ts')],
});
