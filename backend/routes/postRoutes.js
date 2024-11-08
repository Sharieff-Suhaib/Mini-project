const express = require("express");
const multer = require('multer');
const { formPost, getPosts,deletePost } = require("../controllers/postController");
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); 
        cb(null, Date.now() + ext); 
    }
});
const upload = multer({ storage: storage }); 
const router = express.Router();

router.post("/create",upload.single('image'), formPost);
router.get("/posts", getPosts);
router.delete('/:postId', deletePost);

module.exports = router;