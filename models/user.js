const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('../utils/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: email => /^[\w.-]{2,}@([\w-]{2,}\.)+[\w-]{2,}/.test(email),
      message: 'Некорректный Email!'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

userSchema.statics.findUserByCredentials = function(email, password) {
  return this.findOne({ email }).select('+password')
    .then(user => {
      if (!user) throw new AuthenticationError();

      return bcrypt.compare(password, user.password)
        .then(isMatched => {
          if (!isMatched) throw new AuthenticationError();
          return user;
        })
    })
}

module.exports = mongoose.model('user', userSchema);
