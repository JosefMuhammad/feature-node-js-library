const express = require("express");
const booksController = require("../controllers/booksController");

const bookRouter = express.Router();

bookRouter.post("/register", booksController.register);

bookRouter.delete("/:id", booksController.remove);

module.exports = bookRouter;
