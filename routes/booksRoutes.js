const express = require("express");
const booksController = require("../controllers/booksController");

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(booksController.getAll)
  .post(booksController.register);

bookRouter
  .route("/:id")
  .get(booksController.getOne)
  .delete(booksController.remove);

module.exports = bookRouter;
