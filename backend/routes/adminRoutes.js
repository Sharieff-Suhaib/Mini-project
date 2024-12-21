const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/query', adminController.handleQuery);

module.exports = router;