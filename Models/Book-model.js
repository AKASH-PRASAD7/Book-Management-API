const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
//collection will have name with books in MONGODb
module.exports = mongoose.model("Book", bookschema);