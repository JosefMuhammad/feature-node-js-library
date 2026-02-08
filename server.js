const express = require("express");
const bodyParser = require("body-parser");
const booksModel = require("./models/books");
const bookRegisterValidator = require("./validators/booksRegister");
const userRouter = require("./routes/usersRoutes");
require("./configs/db");

const app = express(); // server
// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users/", userRouter);

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

app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;

  if (isValidObjectId(id)) {
    const deletedBook = await booksModel.findByIdAndDelete({ _id: id });
    if (!deletedBook) {
      res.status(404).json({ message: "There no such book with this id! " });
    }
  } else {
    return res.status(422).json({ message: "Book's id is not valid" });
  }

  res.status(200).json({ message: "Book was deleted successfully" });
});
app.listen(3000, () => {
  console.log(`Server Running On Port 3000`);
});
