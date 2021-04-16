const { Joi } = require('celebrate');

const registerJoi = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(/^\w{8,16}$/)
  })
};

const loginJoi = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(/^\w{8,16}$/)
  })
};

const userJoi = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email()
  })
};

const movieJoi = {
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(2).max(100),
    image: Joi.string().required().pattern(/^https?:\/\/(www\.)?.+#?$/),
    trailer: Joi.string().required().pattern(/^https?:\/\/(www\.)?.+#?$/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/(www\.)?.+#?$/),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    movieId: Joi.string().required()
  })
};

const movieIdJoi = {
  params: Joi.object().keys({
    id: Joi.string().required().pattern(/^\w+$/)
  })
};

const errorMessage = {
  400: 'Переданы некорректные данные',
  401: 'Необходима авторизация',
  403: 'Недостаточно прав',
  404: 'Запрашиваемые данные не найдены',
  409: 'Такой пользователь уже существует',
  500: 'Проблемы с сервером, но мы скоро все исправим'
};

const origin = {
  'http://localhost:5000': 'http://localhost:5000',
  'https://media-store.nomoredomains.icu': 'https://media-store.nomoredomains.icu'
}

module.exports = { registerJoi, loginJoi, userJoi, movieJoi, movieIdJoi, origin, errorMessage }
