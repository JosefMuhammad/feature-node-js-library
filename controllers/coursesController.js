const commentModel = require("../models/comment");
const courseModel = require("../models/course");
const sessionsModel = require("../models/session");

exports.getAll = async (req, res) => {
  const course = await courseModel
    .find({}, "-__v")
    .populate("teacher", "-__v")
    .populate("comment", "-__v");
  res.json(course);
};

exports.getOne = async (req, res) => {
  const { title } = req.params;
  const course = await courseModel.findOne({ title });
  const comment = await commentModel.find({ course: course._id }).lean();
  const session = await sessionsModel
    .find({ course: course._id }, "-__v")
    .lean();

  res.json({ ...course, comment, session });
};

exports.setComment = async (req, res) => {
  const { body, courseId } = req.body;

  const comment = await commentModel.create({
    body,
  });

  await courseModel.findOneAndUpdate(
    { _id: courseId.toString() },
    { $push: { comment: comment._id } },
  );

  res.json({ message: "Comment was set successfully" });
};
