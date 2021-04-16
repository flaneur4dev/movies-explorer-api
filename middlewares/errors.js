const { errorMessage } = require('../utils/utils');

module.exports = function(err, req, res, next) {
  let { statusCode, name, message, code } = err;

  const isValidationError = /(MongoError|ValidationError)/.test(name) || /celebrate/.test(message);
  const isCastingError = /CastError/.test(name);

  if (!statusCode) statusCode = isValidationError ? 400 : isCastingError ? 404 : 500;

  if (isValidationError) message = errorMessage['400'];
  if (isCastingError) message = errorMessage['404'];
  if (code === 11000) {
    statusCode = 409;
    message = errorMessage[statusCode]
  }

  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? errorMessage['500'] : message })
}
