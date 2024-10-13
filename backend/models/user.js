const pool = require('../config/db');

const createUser = async (email, passwordHash) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, passwordHash]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};


module.exports = {
  createUser, findUserByEmail
};
