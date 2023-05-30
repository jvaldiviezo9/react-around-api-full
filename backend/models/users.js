const mongoose = require("mongoose");
const validatorjs = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: false,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: (v) => {
        return /(http|https):\/\/(www\.)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/.test(v);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        return validatorjs.isEmail(v);
      }
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

// Add this line to create the unique index on the email field
// userSchema.index({ email: 1 }, { unique: true });

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user; // ahora user está disponible
        });
    });
};


module.exports = mongoose.model("user", userSchema);
