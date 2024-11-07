const { createComment, findByPostId } = require('../models/comments');

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await findByPostId(req.params.postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

const addComment = async (req, res) => {
    try {
        const { userId, postId, commentText } = req.body;

        const newComment = await createComment(userId, postId, commentText);
        res.json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
};
module.exports = {
    addComment,
    getCommentsByPostId
  };