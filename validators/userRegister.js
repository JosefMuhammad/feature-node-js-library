const Validator = require("fastest-validator");

const v = new Validator();

const schema = {
  name: {
    type: "string",
    min: 3,
    max: 20,
  },
  username: {
    type: "string",
    min: 3,
    max: 50,
  },
  email: {
    type: "string",
  },
  password: {
    type: "string",
    min: 8,
    max: 20,
  },
  confirmPassword: {
    type: "equal",
    field: "password",
  },

  $$strict: true, //no additional properties is allowed
};

const check = v.compile(schema);

module.exports = check;
