const Movie = require('../models/movie');
const { NotFoundError, AuthorizationError } = require('../utils/errors');

function getMovies(req, res, next) {
  Movie.find({})
    .populate('user')
    .then(movies => res.status(200).send(movies))
    .catch(next)
}

function createMovie(req, res, next) {
  Movie.create({ ...req.body, owner: req.user._id })
    .then(movie => res.status(201).send(movie))
    .catch(next)
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.id)
    .then(movie => {
      if (!movie) throw new NotFoundError();
      if (movie.owner != req.user._id) throw new AuthorizationError();

      return Movie.findByIdAndDelete(req.params.id);
    })
    .then(() => res.status(200).send({ message: `Карточка с id: ${req.params.id} удалена` }))
    .catch(next)
}

module.exports = { getMovies, createMovie, deleteMovie }
