const express = require('express');

// const bodyParser = require('body-parser');
const userRouter = express.Router();

const {
  getUsers,
  getUserById,
  getInfo,
  updateInfo,
  addProfile,
  addAvatar,
} = require('../controllers/users');

// userRouter.use(bodyParser.json());
// userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.get('/', getUsers);
userRouter.get('/me', getInfo);
userRouter.get('/:id', getUserById);

userRouter.patch('/me', updateInfo);
userRouter.patch('/me/avatar', updateInfo);

userRouter.patch('/profile/:id', addProfile);
userRouter.patch('/avatar/:id', addAvatar);

module.exports = userRouter;
