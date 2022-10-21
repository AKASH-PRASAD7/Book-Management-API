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
