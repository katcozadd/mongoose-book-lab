// book.js
var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  image: String,
  releaseDate: String
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;
