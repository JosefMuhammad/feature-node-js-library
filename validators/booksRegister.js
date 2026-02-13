const Validator = require("fastest-validator");

const v = new Validator();
const schema = {
  author: {
    type: "string",
    min: 2,
    max: 30,
  },
  title: {
    type: "string",
    min: 2,
    max: 30,
  },
  price: {
    type: "number",
  },
  free: {
    type: "number",
  },

  $$strict: true,
};

const check = v.compile(schema);
module.exports = check;
