const mongoose = require("mongoose");

const booksModel = mongoose.model("book", {
  author: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  free: {
    type: Number,
    require: true,
    default: 0,
  },
});

module.exports = booksModel;
