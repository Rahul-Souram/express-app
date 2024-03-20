const { constants } = require("../constants");

const { NOT_FOUND, UN_AUTHORISED, FORBIDDEN, VALIDATION_ERROR, SERVER_ERROR } =
  constants;

// Error handling Middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  switch (statusCode) {
    case UN_AUTHORISED:
      res.json({
        error: "UnAuthorized",
        message: err.message,
      });
      break;
    case NOT_FOUND:
      res.json({
        error: "Page not found",
        message: err.message,
      });
      break;
    case VALIDATION_ERROR:
      res.json({
        error: "Validation Failed",
        message: err.message,
      });
      break;
    case FORBIDDEN:
      res.json({
        error: "FORBIDDEN",
        message: err.message,
      });
      break;
    case SERVER_ERROR:
      res.json({
        error: "Server Error",
        message: err.message,
      });
      break;

    default:
      break;
  }
};

module.exports = errorHandler;
