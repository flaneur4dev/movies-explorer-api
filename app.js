require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors } = require('celebrate');

const { PORT, DB_ADRESS } = require('./config');
const { createUser, login, logout } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errors');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { NotFoundError } = require('./utils/errors');
const { registerJoi, loginJoi, origin } = require('./utils/utils');

const app = express();

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(requestLogger);

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': origin[req.headers.origin] || 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Credentials': true,
    // 'Content-Security-Policy': 'default-src "self"; img-src *',
    'Referrer-Policy': 'no-referrer'
  });
  next()
});

app.options('*', (req, res) => res.status(204).end());

app.post('/signup', celebrate(registerJoi), createUser);
app.post('/signin', celebrate(loginJoi), login);

app.use(auth);
app.post('/signout', logout);

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.use((req, res) => {
  throw new NotFoundError()
});

app.use(errorLogger);
// app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}...`))
