const express = require('express');

// const bodyParser = require('body-parser');
const userRouter = express.Router();

const {
  getUsers,
  getUserById,
  getInfo,
  addProfile,
  addAvatar
} = require('../controllers/users');

// userRouter.use(bodyParser.json());
// userRouter.use(bodyParser.urlencoded({ extended: true }));

userRouter.get('/', getUsers);
userRouter.get('/me', getInfo);
userRouter.get('/:id', getUserById);
userRouter.patch('/:id/profile', addProfile);
userRouter.patch('/:id/avatar', addAvatar);

module.exports = userRouter;
