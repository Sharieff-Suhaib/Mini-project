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
  const deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const deletedPost = await Post.deletePost(postId);
      if (deletedPost) {
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error deleting post' });
    }
  };
module.exports = {
    formPost,getPosts,deletePost
}