const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 && !message ? 'Se ha producido un error en el servidor' : message,
  });
};

module.exports = errorHandler;
