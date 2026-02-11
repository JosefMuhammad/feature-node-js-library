const registerValidator = require("../validators/userRegister");
const usersModel = require("../models/usersModel");
const { isValidObjectId } = require("mongoose");

exports.register = async (req, res) => {
  const { name, username, email, age, password } = req.body;
  const validationResult = registerValidator(req.body);
  if (validationResult !== true) {
    return res.status(422).json(validationResult);
  }

  const user = await usersModel.create({
    name,
    username,
    email,
    age,
    password,
  });

  res.status(201).json({
    message: "New user created successfully",
    user,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id)) {
    const deletedUser = await usersModel.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      res.status(404).json({ message: "There no such user with this id! " });
    }
  } else {
    return res.status(422).json({ message: "User's id is not valid" });
  }

  res.status(200).json({ message: "User was deleted successfully" });
};
