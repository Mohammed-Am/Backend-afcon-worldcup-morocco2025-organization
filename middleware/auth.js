
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from cookies
  const token = req.cookies.token;
  console.log('Auth Middleware: Token from cookie:', token);

  // Check if not token
  if (!token) {
    console.log('Auth Middleware: No token found.');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth Middleware: Decoded JWT:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
