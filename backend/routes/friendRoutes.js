const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');

router.post('/friend-request', friendController.sendFriendRequest);
router.post('/accept-friend', friendController.acceptFriendRequest);
router.post('/reject-friend', friendController.rejectFriendRequest);
router.get('/pending-requests/:userId', friendController.listFriendRequests);
router.get('/:userId', friendController.listFriends);

module.exports = router;