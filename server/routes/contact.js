const express = require('express');
const rateLimit = require('express-rate-limit');
const { validateContactForm } = require('../middleware/validation');
const { sendContactEmails } = require('../services/emailServices');
const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: 'Too many contact form submissions, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(contactLimiter);

router.post('/', validateContactForm, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    await sendContactEmails({
      name,
      email,
      subject,
      message
    });
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    if (error.code === 'EAUTH') {
      res.status(500).json({
        success: false,
        error: 'Email authentication failed. Please try again later.',
      });
    } else if (error.code === 'ECONNREFUSED') {
      res.status(500).json({
        success: false,
        error: 'Unable to connect to email service. Please try again later.',
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send message. Please try again later.',
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      });
    }
  }
});

module.exports = router;