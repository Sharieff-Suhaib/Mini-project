const pool = require("../config/db");

const updateUser = async (user_id, fieldsToUpdate) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (let key in fieldsToUpdate) {
    fields.push(`${key} = $${index}`);
    values.push(fieldsToUpdate[key]);
    index++;
  }

  const query = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE user_id = $${index}
    RETURNING *;
  `;
  values.push(user_id);

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  updateUser,
};
