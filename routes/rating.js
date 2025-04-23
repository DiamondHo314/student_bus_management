const express = require('express');
const router = express.Router();
const ratingsController = require('../controllers/ratingsController');

// ratings dile
router.post('/submit-rating', ratingsController.submitRating);

module.exports = router;