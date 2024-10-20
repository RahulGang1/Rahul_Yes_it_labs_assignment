const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const actualToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(actualToken, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticate;
