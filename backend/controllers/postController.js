const Post = require("../models/posts");
const formPost = async (req, res) => {
  const { caption, user_id } = req.body;
  const imageUrl = req.file ? req.file.filename : null;
  
  try {
      const post = await Post.createPost(user_id, caption, imageUrl);
      res.json({ post });
  } catch (err) {
      res.status(500).json({ error: "Unable to create post" });
  }
};

const getPosts = async (req, res) => {
    try {
      const posts = await Post.findAllPosts();
      res.json({ posts });
    } catch (err) {
      res.status(500).json({ error: "Unable to fetch posts" });
    }
  };
module.exports = {
    formPost,getPosts
}