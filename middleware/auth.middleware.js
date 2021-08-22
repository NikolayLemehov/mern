const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  console.log('auth middleware', config.get('jwtSecret'));
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({message: 'Нет авторизации'});
    }
    const decoder = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoder;
  } catch (e) {
    res.status(401).json({message: 'Нет авторизации, блин'});
  }
  return next();
};
