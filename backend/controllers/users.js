const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModelMongo = require('../models/users');

const { JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next({ statusCode: 401, message: 'Email o Password incorrecto' });
  }

  UserModelMongo.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return next({ statusCode: 401, message: 'Email o Password incorrecto' });
      }
      const payload = {
        _id: user._id,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token });
    })
    .catch(() => next({ statusCode: 500, message: 'Error de servidor' }));
};

const getUsers = (req, res, next) => {
  UserModelMongo.find({})
    .then((users) => {
      res.json({ data: users });
    })
    .catch((err) => next({ statusCode: 404, message: 'No se encuentra la página', error: err }));
};

const getInfo = (req, res, next) => {
  UserModelMongo.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next({ statusCode: 404, message: 'Usuario no encontrado' });
      }
      res.json(user);
    })
    .catch(() => next({ statusCode: 500, message: 'Error de servidor' }));
};

const updateInfo = (req, res, next) => {
  UserModelMongo.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next({ statusCode: 404, message: 'Usuario no encontrado' });
      }
      Object.assign(user, req.body);
      return user.save();
    })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch(() => next({ statusCode: 500, message: 'Error de servidor' }));
};

const getUserById = (req, res, next) => {
  UserModelMongo.findById(req.params.id)
    .orFail(() => {
      const err = new Error('No se encuentra el usuario');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => next({ statusCode: err.statusCode || 500, message: err.message }));
};

const createUser = (req, res, next) => {
  if (!req.body) {
    return next({ statusCode: 404, message: 'Faltan datos para crear el usuario' });
  }

  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return next({ statusCode: 500, message: 'Hubo un error al crear el usuario', error: err });
    }

    const userModel = new UserModelMongo({
      name, about, avatar, email, password: hashedPassword,
    });

    userModel.save()
      .then((user) => res.send({ data: user }))
      .catch((userModelErr) => next({
        statusCode: 400,
        message: 'Hubo un error al guardar el usuario',
        error: userModelErr,
      }));
  });
};

const addProfile = (req, res, next) => {
  UserModelMongo.findByIdAndUpdate(req.params.id, { profile: req.body.profile }, { new: true })
    .orFail(() => {
      const err = new Error('No se encuentra el usuario');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => next({ statusCode: 400, message: 'Hubo un error al guardar el usuario', error: err }));
};

const addAvatar = (req, res, next) => {
  UserModelMongo.findByIdAndUpdate(req.params.id, { avatar: req.body.avatar }, { new: true })
    .orFail(() => {
      const err = new Error('No se encuentra el usuario');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    .catch((err) => next({ statusCode: 400, message: 'Hubo un error al guardar el usuario', error: err }));
};

module.exports = {
  login,
  getUsers,
  getUserById,
  getInfo,
  updateInfo,
  createUser,
  addProfile,
  addAvatar,
};
