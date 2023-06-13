const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      // comprueba el estado y muestra un mensaje basado en dicho estado
      message: statusCode === 500
        ? 'Se ha producido un error en el servidor'
        : message,
    });
};

module.exports = errorHandler;
