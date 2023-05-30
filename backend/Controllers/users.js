const userModelMongo = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = (req, res) => {

  // console.log(req.body)
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(401).json({ message: 'Email o Password incorrecto' });
    return;
  }

  userModelMongo.findUserByCredentials(email, password)
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'Email o Password incorrecto' });
        return;
      }
      const payload = {
        _id: user._id
      };
      const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '7d' });
      // console.log(token)
      res.json({ token: token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error de servidor' });
    });
};


const getUsers = (req, res) => {
  userModelMongo.find({})
    .then(users => {
      res.json({data: users});
    })
    .catch(err => {
      res.status(404).json({message: 'No se encuentra la página', error: err});
    });
};

const getInfo = (req, res) => {

  // console.log(req.user)

  userModelMongo.findById(req.user._id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({ data: user });

    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: 'Error de servidor' });
    });
}


const getUserById = (req, res) => {
  userModelMongo.findById(req.params.id)
    .orFail(() => {
      const err = new Error('No se encuentra el usuario');
      err.status = 404;
      throw err;
    })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(err.status || 500).json({ message: err.message });
    });
};



const createUser = (req, res) => {
  if (!req.body) {
    res.status(404).json({ message: 'Faltan datos para crear el usuario' });
    return;
  }

  const { name, about, avatar, email, password } = req.body;

  // Generate a salt and hash the password
  // this uses the callback option, so no need to use a promise
  // https://www.npmjs.com/package/bcryptjs
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({ message: 'Hubo un error al crear el usuario', error: err });
      return;
    }

    const user = new userModelMongo({ name, about, avatar, email, password: hashedPassword });

    user.save()
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(400).send({ message: 'Hubo un error al guardar el usuario', error: err }));
  });
};

const addProfile = (req, res) => {
  userModelMongo.findByIdAndUpdate(req.params.id, {profile: req.body.profile}, {new: true})
    .orFail(() => {
      const err = new Error('No se encuentra el usuario');
      err.status = 404;
      throw err;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: 'Hubo un error al guardar el usuario', error: err }));
}

const addAvatar = (req, res) => {
  userModelMongo.findByIdAndUpdate(req.params.id, {avatar: req.body.avatar}, {new: true})
    .orFail(() => {
      const err = new Error('No se encuentra el usuario');
      err.status = 404;
      throw err;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: 'Hubo un error al guardar el usuario', error: err }));
}

module.exports = {
  login,
  getUsers,
  getUserById,
  getInfo,
  createUser,
  addProfile,
  addAvatar
}
