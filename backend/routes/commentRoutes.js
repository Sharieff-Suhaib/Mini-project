const express = require("express");
const { formComment, getComments } = require("../controllers/commentController");
const router = express.Router();

router.post("/create", formComment);
router.get("/:postId", getComments);

module.exports = router;
