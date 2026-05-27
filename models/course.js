const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId, // ONE_TO_MANY RELATIONS
    ref: "teacher",
  },
});

courseSchema.virtual("comment", {
  ref: "comment",
  localField: "_id",
  foreignField: "course",
});

courseSchema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});
const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
