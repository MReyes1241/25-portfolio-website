const validator = require('validator');

const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  
  const errors = [];
  
  // Validate required fields
  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email is required');
  }
  
  if (!subject || subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }
  
  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  // Lengths
  if (name && name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (subject && subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }
  
  if (message && message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  const spamPatterns = [
    /https?:\/\/[^\s]+/gi, // URLs
    /\b(?:click here|act now|limited time|urgent|guaranteed)\b/gi, // Spam keywords
    /(.)\1{10,}/gi, // Repeated characters
  ];
  
  const fullText = `${name} ${email} ${subject} ${message}`.toLowerCase();
  const urlMatches = fullText.match(/https?:\/\/[^\s]+/gi);
  
  if (urlMatches && urlMatches.length > 2) {
    errors.push('Message contains too many links');
  }
  
  for (const pattern of spamPatterns.slice(1)) {
    if (pattern.test(fullText)) {
      errors.push('Message appears to be spam');
      break;
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false, 
      error: 'Validation failed',
      details: errors 
    });
  }
  
  // format user inputs
  req.body.name = validator.escape(name.trim());
  req.body.email = validator.normalizeEmail(email);
  req.body.subject = validator.escape(subject.trim());
  req.body.message = validator.escape(message.trim());
  
  next();
};

module.exports = {
  validateContactForm
};