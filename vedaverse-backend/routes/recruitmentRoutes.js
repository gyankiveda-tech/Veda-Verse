const express = require('express');
const router = express.Router();
const { submitApplication } = require('../controllers/recruitmentController');

// POST request to submit application
router.post('/apply', submitApplication);

module.exports = router;