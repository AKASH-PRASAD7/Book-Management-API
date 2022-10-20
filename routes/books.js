const express = require("express");
const { append } = require("express/lib/response");
const booksRouter = express.Router();

const { books } = require("../Data/Books.json");
const { users } = require("../Data/Users.json");
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

/**
 * Route: books/issued/by-user
 * Method: GET
 * Description: Getting all issued books
 * Acess: Public
 * Paramenters: none
 */

booksRouter.get("/issued/by-user", (req, res) => {
  const userWithIssuedBooks = users.filter((each) => {
    if (each.issued_book) {
      return each;
    }
  });

  let bookissued = [];

  userWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => each.issued_book === book.id);

    book.issued_by = each.name;
    book.issued_date = each.isuued_date;
    book.return_date = each.return_date;

    bookissued.push(book);
  });

  if (userWithIssuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Books been Issued",
    });
  }
  return res.status(200).json({
    success: true,
    data: bookissued,
  });
});

/**
 * Route: books
 * Method: POSt
 * Description: Creating new book
 * Acess: Public
 * Paramenters: none
 * Data: id ,name ,author, genre ,price, publisher , publication date, pages
 */

booksRouter.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Please provide data",
    });
  }
  books.find((each) => {
    if (each.id === data.id) {
      return res.status(400).json({
        sucess: false,
        message: "ID already exist enter new one",
      });
    }
  });

  const allbooks = [...books, data];

  return res.status(200).json({
    sucess: true,
    data: allbooks,
  });
});

/**
 * Route: books
 * Method: POSt
 * Description: Creating new book
 * Acess: Public
 * Paramenters: none
 * Data: id ,name ,author, genre ,price, publisher , publication date, pages
 */

booksRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book dosen't exist",
    });
  }
  const upadatebook = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    message: "Upadated Successfully",
    data: upadatebook,
  });
});

module.exports = booksRouter;
