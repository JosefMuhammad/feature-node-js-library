const usersModel = require("../models/usersModel");

module.exports = async (req, res, next) => {
  const { id } = req.body;
  const user = await usersModel.findOne({ _id: id }).lean();

  if (user) {
    if (user.role === "ADMIN") {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "Not Allowed. Admin Access Required" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
