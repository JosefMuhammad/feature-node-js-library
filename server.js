const express = require("express");
const bodyParser = require("body-parser");
const usersModel = require("./models/users");
const booksModel = require("./models/books");
const registerValidator = require("./validators/register");
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

app.post("/api/books", async (req, res) => {
  try {
    const { author, title, price } = req.body;

    if (!author || !title || !price) {
      return res.status(422).json({
        message: "Data is not valid",
      });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log(`Server Running On Port 3000`);
});
