/**
 * while error is not aresource it makes
 * sense to place this logic here since this is
 * where the error logic will be controlled
 */
const AppError = require('../lib/appError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // should only send operational errors and not
  // detailed internal server errors
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // programming or other unknown error: don't leak!
  else {
    console.error('ERROR ', err);
    res
      .status(500)
      .json({ status: 'error', message: 'Uh Oh, something went very wrong' });
  }
};

/**
 * Error handler is used if the user doesn't supplement all
 * fields during the creation of a new resource
 * @param {*} err
 */
const handleNullErrorDB = (err) => {
  const message = `Invalid ${err.column} supplied.`;
  return new AppError(message, 400);
};

/**
 * Error handler is used if the user doesn't supplement all
 * fields during the creation of a new resource
 * @param {*} err
 */
const handleDataErrorDB = (err, req) => {
  const message = `Invalid id given.  Please ensure id is a number.`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token.  Please login in again!', 401);
const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired.  Please log in again!', 401);

module.exports = (err, req, res, next) => {
  // if not defined internal server error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // if we're in development send all the data for debugging
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    // missing fields for post requests
    if (error.name === 'NotNullViolationError') {
      error = handleNullErrorDB(error);
    }
    // incorrect parameter for id in get requests
    if (error.name === 'DataError') {
      error = handleDataErrorDB(error, req);
    }
    // for expired/modified tokens
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError(error);
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError(error);
    }

    sendErrorProd(error, res);
  }
};
