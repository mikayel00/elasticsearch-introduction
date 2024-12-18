import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  logger: 'advanced-console',
  logging: ['warn', 'error'],
  entities: [path.join(__dirname, '/src/modules/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '/src/database/migrations/**/*.ts')],
});

export default dataSource;
