const express = require("express");

const booksRouter = express.Router();

const { books } = require("../Data/Books.json");
const { users } = require("../Data/Users.json");

//Controller
const {
  getAllBooks,
  getBookById,
  getAllIsuuedBooks,
  addNewBook,
  upadateBook,
} = require("../Controllers/Book_controller");

/**
 * Route: books
 * Method: GET
 * Description: Get all Books
 * Acess: Public
 * Paramenters: none
 */

booksRouter.get("/", getAllBooks);

/**
 * Route: books/:id
 * Method: GET
 * Description: Getting a book by ID
 * Acess: Public
 * Paramenters: id
 */

booksRouter.get("/:id", getBookById);

/**
 * Route: books/issued/by-user
 * Method: GET
 * Description: Getting all issued books
 * Acess: Public
 * Paramenters: none
 */

booksRouter.get("/issued/by-user", getAllIsuuedBooks);

/**
 * Route: books
 * Method: POSt
 * Description: Creating new book
 * Acess: Public
 * Paramenters: none
 * Data: id ,name ,author, genre ,price, publisher , publication date, pages
 */

booksRouter.post("/", addNewBook);

/**
 * Route: books
 * Method: POSt
 * Description: Upadating book by id
 * Acess: Public
 * Paramenters: id
 * Data: name ,author, genre ,price, publisher , publication date, pages
 */

booksRouter.put("/:id", upadateBook);

/**
 * Route: /books/issued/withFine
 * Method: GET
 * Description: Creating new book
 * Acess: Public
 * Paramenters: none
 * Data: none
 */

booksRouter.get("/issued/withFine", (req, res) => {
  // Returns date in Days from 1 Jan 1970
  const dateInDays = (data = "") => {
    let date = 0;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }

    date = Math.floor(date / (1000 * 60 * 60 * 24));
    return date;
  };

  //gives current days
  let cuurentdate = dateInDays();

  const user = users.filter((each) => {
    returnDate = dateInDays(each.return_date);

    if (cuurentdate > returnDate) {
      return each;
    }
  });

  let book1 = {};
  user.map((user1) => {
    books.map((each) => {
      if (user1.issued_book === each.id) {
        book1 = { ...each };
        console.log(book1);
      }
    });
  });
  console.log("safsdfjsdhhj");

  console.log(book1);

  if (!book1) {
    return res.status(400).json({
      success: false,
      message: "No books with fine",
    });
  }

  return res.status(200).json({
    success: true,
    data: book1,
  });
});

module.exports = booksRouter;
