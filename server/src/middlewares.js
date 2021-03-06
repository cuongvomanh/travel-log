const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 5000 : res.statusCode; 
  res.json({
    message: error.message,
    stack: error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
