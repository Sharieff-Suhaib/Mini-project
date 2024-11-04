const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'social_media',
  password: 'SunSet@0614',
  port: 5432,
});
pool.connect()
  .then(() => console.log('Database connected using pg Pool...'))
  .catch((err) => console.log('Connection error: ' + err));
module.exports = pool;
