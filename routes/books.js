const express = require("express");
const booksRouter = express.Router();

const { books } = require("../Data/Books.json");

/**
 * Route: books
 * Method: GET
 * Description: Get all Books
 * Acess: Public
 * Paramenters: none
 */

booksRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route: books/:id
 * Method: GET
 * Description: Getting a book by ID
 * Acess: Public
 * Paramenters: id
 */

booksRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book doesn't exist",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Book found",
    data: book,
  });
});

// For all non existing Routes
booksRouter.get("*", (req, res) => {
  res.status(404).send({
    msg: "Route does not exist",
  });
});

module.exports = booksRouter;
