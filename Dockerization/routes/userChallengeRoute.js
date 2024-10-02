const express = require('express');
const { joinChallenge, markStepComplete } = require('../controllers/userChallengesController');
const router = express.Router();

router.post('/joinChallenge', joinChallenge);
router.post('/markStep', markStepComplete);

module.exports = router;
