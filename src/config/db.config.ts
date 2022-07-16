import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ENV } from 'src/interfaces/env.interface';
export const ENV_VARIABLES = process.env as any as ENV;

export default registerAs(
  'db',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: ENV_VARIABLES.PGHOST,
    database: ENV_VARIABLES.PGDATABASE,
    password: ENV_VARIABLES.PGPASSWORD,
    username: ENV_VARIABLES.PGUSER,
    entities: [__dirname + '/../**/*.model.{js,ts}'],
    synchronize: false,
  }),
);
