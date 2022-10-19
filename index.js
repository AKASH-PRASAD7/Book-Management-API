const express = require("express");
const { type } = require("express/lib/response");
const { users } = require("./Data/Users.json"); //data import
const app = express();
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

/**
 * Route: Users
 * Method: GET
 * Description: Get all Users
 * Acess: Public
 * Paramenters: none
 */
app.get("/users", (req, res) => {
  res.status(200).json({
    sucess: true,
    data: users,
  });
});

/**
 * Route: Users/:id
 * Method: GET
 * Description: Get Users by
 * Acess: Public
 * Paramenters: id
 */

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "User does not exist",
    });
  }
  return res.status(200).json({
    sucess: true,
    data: user,
  });
});

/**
 * Route: Users
 * Method: POST
 * Description: Create new user
 * Acess: Public
 * Paramenters: none
 */
app.post("/users", (req, res) => {
  const { id, name, surname, email, sub_type, sub_date } = req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(400).json({
      sucess: false,
      message: "User already exist with given ID",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    sub_type,
    sub_date,
  });

  return res.status(200).json({
    success: true,
    data: users,
  });
});

// For all non existing Routes
app.get("*", (req, res) => {
  res.status(404).send({
    msg: "Route does not exist",
  });
});
