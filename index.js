const express = require("express");
const usersRoute = require("./routes/users");
const booksRoute = require("./routes/books");
const dotenv = require("dotenv");

//DataBase Coonection
const DBConnection = require("./DBConntion");

dotenv.config();
const app = express();

DBConnection();

const port = 8082;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is Running at Port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Server Is Running !", //json()sends only json data
  });
});

app.use("/users", usersRoute);
app.use("/books", booksRoute);

// For all non existing Routes
app.get("*", (req, res) => {
  res.status(404).send({
    msg: "Route does not exist",
  });
});
