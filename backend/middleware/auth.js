const jwt = require('jsonwebtoken');
const AuthorizationMiddleware = (req, res, next) => {
  let tokenRaw = req.headers.authorization;

  // remover "Bearer" del token
  let token = ""
  try {
    token = tokenRaw.replace('Bearer ', '');
  }
  catch (err) {
    return res.status(401).json({ message: 'Formato incorrecto de autorización' });
  }

  if (!token) {
    return res.status(401).json({ message: 'Token de autorización no encontrado' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, 'your-secret-key', (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Token de autorización inválido' });
    }

    // Si el token es válido, añadir el payload al objeto user
    req.user = payload;
    //console.log(req.user._id)
    next();
  });
};

module.exports = AuthorizationMiddleware;
