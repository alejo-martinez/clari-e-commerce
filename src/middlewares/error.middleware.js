import typeError from "../errors/type.error.js";

const errorHandlers = {
  [typeError.INVALID_TYPES]: (res, message) => sendErrorResponse(res, 401, message),
  [typeError.FIELD_VALIDATION_FAILED]: (res, message) => sendErrorResponse(res, 422, message),
  [typeError.MISSING_REQUIRED_FIELDS]: (res, message) => sendErrorResponse(res, 400, message),
  [typeError.NOT_FOUND]: (res, message) => sendErrorResponse(res, 404, message),
  [typeError.DATABASE_ERROR]: (res, message) => sendErrorResponse(res, 503, message),
  [typeError.CONFLICT_ERROR]: (res, message) => sendErrorResponse(res, 409, message),
};

const sendErrorResponse = (res, statusCode, errorMessage) => {
  res.status(statusCode).send({ status: 'error', error: errorMessage });
};

export default (err, req, res, next) => {
  const errorHandler = errorHandlers[err.code];

  if (errorHandler) {
    errorHandler(res, err.message);
  } else {
    sendErrorResponse(res, 500, `${err}`);
  }
};
