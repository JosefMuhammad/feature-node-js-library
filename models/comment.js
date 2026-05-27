const mongoose = require("mongoose");

const commentModel = mongoose.model(
  "comment",
  new mongoose.Schema({
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
  }),
);

module.exports = commentModel;
