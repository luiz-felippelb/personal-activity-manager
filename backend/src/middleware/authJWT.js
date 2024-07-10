const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_PRIVATE_KEY;

if (!secretKey) {
  console.error('JWT_PRIVATE_KEY is not set');
} else {
  console.log('JWT_PRIVATE_KEY is set');
}

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // console.log('Received token:', token); // Log the token

  jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json({ error: 'Forbidden' });
    }

    // console.log('Decoded user:', user); // Log the decoded user

    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
