const pool = require('../config/db');

const createUser = async (email, passwordHash) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, passwordHash]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
};
