const express = require("express");
const usersController = require("../controllers/usersController");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(usersController.getAll)
  .post(usersController.register);

userRouter
  .route("/:id")
  .delete(usersController.remove)
  .get(usersController.getOne);

module.exports = userRouter;
