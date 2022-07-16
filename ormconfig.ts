module.exports = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number.parseInt(process.env.PGPORT, 2),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
