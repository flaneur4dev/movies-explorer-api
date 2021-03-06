const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../utils/errors');
const { JWT_SECRET } = require('../config');

module.exports = function(req, res, next) {
  const token = (/(?<=apt=)[^;]+/.exec(req.headers.cookie) || [])[0];
  if (!token) throw new AuthenticationError();

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    throw new AuthenticationError()
  }
  req.user = payload;

  next()
}
