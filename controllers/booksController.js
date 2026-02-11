const bookRegisterValidator = require("../validators/booksRegister");
const booksModel = require("../models/booksModel");
const { isValidObjectId } = require("mongoose");

exports.register = async (req, res) => {
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
};

exports.remove = async (req, res) => {
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
};
