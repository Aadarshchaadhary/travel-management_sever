class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    Error.captureStackTrace(this, AppError);
  }
}

//* error handler middleware
export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  console.log(error.error);
  res.status(statusCode).json({
    message,
    originalError: error.error ? error.error.stack : error,
    status: error.status || "error",
    statusCode,
  });
};

export default AppError;
