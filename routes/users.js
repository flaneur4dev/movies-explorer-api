const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { userJoi } = require('../utils/utils');
const { getUser, updateUser } = require('../controllers/users');

usersRouter.get('/me', getUser);
usersRouter.patch('/me', celebrate(userJoi), updateUser);

module.exports = usersRouter
