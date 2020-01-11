const jwt = require('jsonwebtoken');

// This is going to be a Middleware
// Maybe use it later
// function auth(req, res, next) {
//   const token = req.header('auth-token');
//   if (!token) return res.status(401).send('Access Denied.');

//   try {
//     const verified = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
//     // Going to be equal to the user_id
//     req.user = verified;
//   } catch (err) {
//     next(new Error(err));
//   }
// }
