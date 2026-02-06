const mongoose = require("mongoose");

const usersModel = mongoose.model("user", {
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  username: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 15,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
    maxLength: 12,
  },
});

module.exports = usersModel;
