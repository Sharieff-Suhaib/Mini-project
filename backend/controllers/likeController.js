const { createLike, countLikesByPostId, findLikeByUserAndPost, deleteLike } = require('../models/likes');

exports.toggleLike = async (req, res) => {
    try {
        const { userId,postId } = req.body;

        const existingLike = await findLikeByUserAndPost(userId, postId);

        if (existingLike) {
            await deleteLike(userId, postId);
            res.json({ liked: false });
        } else {
            await createLike(userId, postId);
            res.json({ liked: true });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle like' });
    }
};

exports.getLikesCount = async (req, res) => {
    try {
        const { postId } = req.params;
        const count = await countLikesByPostId(postId);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch likes count' });
    }
};