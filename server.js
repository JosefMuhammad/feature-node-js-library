const express = require("express");
const bodyParser = require("body-parser");
const usersModel = require("./models/users");
const booksModel = require("./models/books");
const registerValidator = require("./validators/userRegister");
const bookRegisterValidator = require("./validators/booksRegister");
const { isValidObjectId } = require("mongoose");
require("./configs/db");

const app = express(); // server
// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/users/register", async (req, res) => {
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
});

app.post("/api/books/register", async (req, res) => {
  const { author, title, price } = req.body;
  const validationResult = bookRegisterValidator(req.body);

  if (validationResult !== true) {
    res.status(422).json(validationResult);
  }

  const book = await booksModel.create({
    author,
    title,
    price,
  });

  res.status(201).json({
    message: "New Book was added successfully",
    book,
  });
});

app.delete("/api/users/:id", async (req, res) => {
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
});
app.listen(3000, () => {
  console.log(`Server Running On Port 3000`);
});
