const bookmodel = require("../Models/Book-model");
const usermodel = require("../Models/User-model");

//dto
const IssuedBook = require("../dtos/book-dto");
exports.getAllBooks = async (req, res) => {
  const books = await bookmodel.find();
  if (books.length === 0) {
    return res.status(404).json({
      sucess: false,
      message: "No books found",
    });
  }
  return res.status(200).json({
    sucess: true,
    data: books,
  });
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookmodel.findById(id);
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
};

exports.getAllIsuuedBooks = async (req, res) => {
  const users = await usermodel
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook");

  const bookissued = users.map((each) => new IssuedBook(each));

  if (bookissued.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Books been Issued",
    });
  }
  return res.status(200).json({
    success: true,
    data: bookissued,
  });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Please provide data",
    });
  }
  await bookmodel.create(data);

  const allbooks = await bookmodel.find();

  if (allbooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Books been Issued",
    });
  }

  return res.status(200).json({
    sucess: true,
    data: allbooks,
  });
};

exports.upadateBook = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updateBook = await bookmodel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Upadated Successfully",
    data: updateBook,
  });
};
