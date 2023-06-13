const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const AuthorizationMiddleware = (req, res, next) => {
  const tokenRaw = req.headers.authorization;

  // remover "Bearer" del token
  let token = '';
  try {
    token = tokenRaw.replace('Bearer ', '');
  } catch (err) {
    return res.status(401).json({ message: 'Formato incorrecto de autorización' });
  }

  if (!token) {
    return res.status(401).json({ message: 'Token de autorización no encontrado' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Token de autorización inválido' });
    }

    // Si el token es válido, añadir el payload al objeto user
    req.user = payload;
    // console.log(req.user._id)
    next();
  });
};

module.exports = AuthorizationMiddleware;
