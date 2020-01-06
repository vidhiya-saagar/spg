const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../db/user');
// Route paths are prepended with '/auth'
router.get('/', (req, res) => {
  res.json({
    message: '🔒',
  });
});

// Users can login to the app with valid email/password
// Users cannot login to the app with a blank or missing email
// Users cannot login to the app with a blank or incorrect password

// @params: req.body from /signup
function validateUser(user) {
  const validEmail = typeof user.email === 'string' && user.email.trim() != '';
  const validPassword =
    typeof user.password === 'string' && user.password.trim().length >= 6;

  // BOOLEAN
  return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
  if (validateUser(req.body)) {
    User.getOneByEmail(req.body.email).then(user => {
      console.log('User:', user);
      // This is a Unique email
      if (!user) {
        // Put res.json inside of the async function, because we want to wait until we found the one with the email
        res.json({
          user,
          message: '✅',
        });
      }
      // Email in use
      else {
        next(new Error('Email in use'));
      }
    });
  } else {
    next(new Error('Invalid user'));
  }
});
// Makes the router available in the outside world (a.k.a app.js)
module.exports = router;
