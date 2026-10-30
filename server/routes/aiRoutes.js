const express = require('express');
const router = express.Router();
const { getMatchSuggestions, generateSwapMessage } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const {aiMatchRateLimiter}=require('../middleware/aiMatchRateLimiter');
console.log("rateLimiter",typeof aiMatchRateLimiter);

router.post('/match-suggestions', protect,aiMatchRateLimiter, getMatchSuggestions);
router.post('/swap-message', protect,aiMatchRateLimiter, generateSwapMessage);



module.exports = router;