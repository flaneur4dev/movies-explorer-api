const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const { NotFoundError } = require('../utils/errors');

function createUser(req, res, next) {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => User.create({ name, email, password: hash }))
    .then(() => res.status(201).send({ message: 'Вы успешно зарегистрировались!' }))
    .catch(next)
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      const { name, email, _id } = user;

      res
        .status(200)
        .cookie('apt', token, {
          maxAge: 86.4e6,
          secure: !/^http:\/\/localhost/.test(req.headers.origin),
          sameSite: true,
          httpOnly: true
        })
        .send({ name, email, _id })
    })
    .catch(next)
}

function logout(req, res) {
  res
    .status(200)
    .cookie('apt', '', { maxAge: 0, httpOnly: true })
    .send({ message: 'Пользователь вышел' })
}

function getUser(req, res, next) {
  User.findById(req.user._id)
    .then(user => {
      if (!user) throw new NotFoundError();
      res.status(200).send(user);
    })
    .catch(next)
}

function updateUser(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then(user => res.status(200).send(user))
    .catch(next)
}

module.exports = { createUser, login, logout, getUser, updateUser }
