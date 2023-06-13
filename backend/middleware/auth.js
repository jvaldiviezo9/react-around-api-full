const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const AuthorizationMiddleware = (req, res, next) => {
  const tokenRaw = req.headers.authorization;

  // Remove "Bearer" from the token
  let token = '';
  try {
    token = tokenRaw.replace('Bearer ', '');
  } catch (err) {
    const error = { statusCode: 403, message: 'Formato incorrecto de autorización' };
    return next(error);
  }

  if (!token) {
    const error = { statusCode: 401, message: 'Token de autorización no encontrado' };
    return next(error);
  }

  // Verify and decode the token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      const error = { statusCode: 401, message: 'Token de autorización inválido' };
      return next(error);
    }

    // If the token is valid, add the payload to the req.user object
    req.user = payload;
    next();
  });
};

module.exports = AuthorizationMiddleware;
