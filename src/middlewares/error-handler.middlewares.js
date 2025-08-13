//  error handler middleware
export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "something went wrong";
  res.status(statusCode).json({
    message,
    error: error.error,
    status: "error",
    statusCode,
  });
};
