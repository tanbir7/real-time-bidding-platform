const express = require('express');
const router = express.Router({ mergeParams: true });
const bidController = require('../controllers/bidController');
const authMiddleware = require('../middleware/authMiddleware');

// Authenticated users can place a new bid
router.post('/', authMiddleware, bidController.placeBid);

// Get all bids for a specific item
router.get('/', bidController.getBids);

module.exports = router;
