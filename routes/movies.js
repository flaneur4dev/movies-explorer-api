const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');
const { movieJoi, movieIdJoi } = require('../utils/utils');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrate(movieJoi), createMovie);
moviesRouter.delete('/:id', celebrate(movieIdJoi), deleteMovie);

module.exports = moviesRouter
