const pool = require('./../config/db'); 

exports.handleQuery = async (req, res) => {
  const { query } = req.body;
  let sqlQuery;
  let params = [];

  if (query.toLowerCase().includes('get the details of user')) {
    const username = query.match(/details of user (\w+)/i)[1];
    sqlQuery = `SELECT * FROM users WHERE username = $1`;
    params = [username];
  } 
  
  else if (query.toLowerCase().includes('details of users where month is greater than')) {
    const month = query.match(/details of users where month is greater than (\w+) (\d+)/i);
    const monthName = month[1];
    const year = month[2];
    const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
    sqlQuery = `SELECT * FROM users WHERE EXTRACT(MONTH FROM date) > $1 AND EXTRACT(YEAR FROM date) = $2`;
    params = [monthNumber, year];
  }else if (query.toLowerCase().includes('details of users where month is lesser than')) {
    const month = query.match(/details of users where month is lesser than (\w+) (\d+)/i);
    const monthName = month[1];
    const year = month[2];
    const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
    sqlQuery = `SELECT * FROM users WHERE EXTRACT(MONTH FROM date) < $1 AND EXTRACT(YEAR FROM date) = $2`;
    params = [monthNumber, year];
  } else if (query.toLowerCase().includes('details of users where month is equal to')) {
    const month = query.match(/details of users where month is equal to (\w+) (\d+)/i);
    const monthName = month[1];
    const year = month[2];
    const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
    sqlQuery = `SELECT * FROM users WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2`;
    params = [monthNumber, year];
  } 
  else if (query.toLowerCase().includes('delete user with id')) {
    const userId = query.match(/delete user with id (\d+)/i)[1];
    sqlQuery = `DELETE FROM users WHERE user_id = $1 RETURNING *`;
    params = [userId];
  }
  else if (query.toLowerCase().includes('get the messages sent by')) {
    const username = query.match(/get the messages sent by (\w+)/i)[1];
    sqlQuery = `SELECT * FROM messages WHERE sender_id = $1`;
    params = [username];
  } else if (query.toLowerCase().includes('get the posts sent by')) {
    const username = query.match(/get the posts sent by (\w+)/i)[1];
    sqlQuery = `SELECT * FROM posts WHERE user_id = $1`;
    params = [username];
  } else if (query.toLowerCase().includes('get the comments sent by')) {
    const username = query.match(/get the comments sent by (\w+)/i)[1];
    sqlQuery = `SELECT * FROM comments WHERE user_id = $1`;
    params = [username];
  }
  else if (query.toLowerCase().includes('display all users')) {
    sqlQuery = `SELECT * FROM users`;
  }
   else {
    return res.status(400).json({ error: 'Unsupported query' });
  }
  try {
    const result = await pool.query(sqlQuery, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};