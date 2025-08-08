const express = require('express');
const { generateEmail, sendEmail, generateSubject } = require('../controllers/emailController');

const router = express.Router();

router.post('/generate', generateEmail);
router.post('/send', sendEmail);
router.post('/generate-subject', generateSubject)

module.exports = router;
