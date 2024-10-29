const Comment = require("../models/comments");
const formComment = async (req,res) => {
    const { userId, postId, content } = req.body;
    try{
        const comment = await Comment.createComment(userId, postId, content);
        res.json({comment});
    }
    catch(err){
        res.status(500).json({ error: "Unable to create comment" });
    }
}

const getComments = async (req,res) => {
    const { postId } = req.params;
    try {
        const result = await Comment.createComment(postId);
        res.json({comment});
    }
    catch(err){
        res.status(500).json({error: "Unable to fetch comments"});
    }
}
module.exports = {
    formComment,getComments
}