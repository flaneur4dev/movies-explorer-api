const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  duration: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 4
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: image => /^https?:\/\/(www\.)?.+#?$/.test(image),
      message: 'Некорректная ссылка!'
    }
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: trailer => /^https?:\/\/(www\.)?.+#?$/.test(trailer),
      message: 'Некорректная ссылка!'
    }
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: thumbnail => /^https?:\/\/(www\.)?.+#?$/.test(thumbnail),
      message: 'Некорректная ссылка!'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  movieId: {
    type: String,
    required: true
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  }
});

module.exports = mongoose.model('movie', movieSchema);
