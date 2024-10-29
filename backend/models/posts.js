const pool = require('../config/db');

const createPost = async(user_id,caption,image_url) =>{
    const result = await pool.query(
        "INSERT INTO posts (user_id,caption,image_url) VALUES ($1,$2,$3) RETURNING *",
        [user_id,caption,image_url]
       
    );
    return result.rows[0];
}

const findAllPosts = async () =>{
    const result = await pool.query("SELECT * FROM posts ORDER BY created_at DESC");
    return result.rows;
}
module.exports = {
    createPost,findAllPosts
};