const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
function validateUser(user) {
  const validEmail = typeof user.email === 'string' && user.email.trim() != '';
  const validPassword =
    typeof user.password === 'string' && user.password.trim().length >= 6;

  // BOOLEAN
  return validEmail && validPassword;
}

// @params: { email, password }
// POST: /auth/signup
router.post('/signup', (req, res, next) => {
  if (validateUser(req.body)) {
    User.getOneByEmail(req.body.email).then(user => {
      // This is a Unique email
      if (!user) {
        // Hash the pass!
        bcrypt.hash(req.body.password, 10).then(hash => {
          // Insert User into DB
          const user = {
            email: req.body.email,
            password: hash,
            created_at: new Date(),
          };
          User.create(user).then(id => {
            // Put res.json inside of the async function, because we want to wait until we found the one with the email
            res.json({
              id,
              message: '✅',
            });
          });
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

// /auth/login
// Find User by email address
// Hash the entered password
// Compared that hash to the hashed password in DB
// Set a cookie

// @params: { email, password }
// POST: /auth/login
router.post('/login', (req, res, next) => {
  // Technically, they still need valid email/password
  if (validateUser(req.body)) {
    // Find the guys email in DB
    User.getOneByEmail(req.body.email).then(user => {
      if (user) {
        // Compare input password with hashed password
        bcrypt.compare(req.body.password, user.password).then(result => {
          if (result) {
            // Setting the 'set-cookie' header
            res.cookie('user_id', user.id);
            res.json({
              result,
              message: 'Logged in! 🔐',
            });
          } else {
            next(new Error('Invalid login'));
          }
        });
      } else {
        next(new Error('Invalid login'));
      }
    });
  } else {
    next(new Error('Invalid login'));
  }
});

// Makes the router available in the outside world (a.k.a app.js)
module.exports = router;
