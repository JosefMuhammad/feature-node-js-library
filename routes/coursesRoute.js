const express = require("express");
const coursesController = require("../controllers/coursesController");

const coursesRouter = express.Router();
coursesRouter.route("/").get(coursesController.getAll);
coursesRouter.route("/:title").get(coursesController.getOne);
coursesRouter.route("/comment").post(coursesController.setComment);

module.exports = coursesRouter;
