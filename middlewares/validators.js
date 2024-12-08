const { body } = require('express-validator');

const checkSignup = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('confirmPassword').custom((value, { req }) => { 
    if (value !== req.body.password) { 
      throw new Error('Passwords do not match'); 
    } 
    return true; 
  }),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

const checkSignin = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

module.exports = { checkSignup, checkSignin };
