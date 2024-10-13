const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'social_media',
  password: 'Admin123',
  port: 1710,
});

module.exports = pool;
