const express = require("express");
const userRouter = express.Router();

const { users } = require("../Data/Users.json"); //data import

/**
 * Route: Users
 * Method: GET
 * Description: Get all Users
 * Acess: Public
 * Paramenters: none
 */
userRouter.get("/", (req, res) => {
  res.status(200).json({
    sucess: true,
    data: users,
  });
});

/**
 * Route: User/:id
 * Method: GET
 * Description: Get Users by
 * Acess: Public
 * Paramenters: id
 */

userRouter.get("/:id", (req, res) => {
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
userRouter.post("/", (req, res) => {
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

/**
 * Route: User/:id
 * Method: PUT
 * Description: Upadating user data
 * Acess: Public
 * Paramenters: id
 */

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }
  const updateuser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  res.status(200).json({
    sucess: true,
    data: updateuser,
  });
});

/**
 * Route: User/:id
 * Method: DELETE
 * Description: Deleting a User by ID
 * Acess: Public
 * Paramenters: id
 */
userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "User does not exist",
    });
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    sucess: true,
    message: "User deleted",
    data: users,
  });
});

// For all non existing Routes
userRouter.get("*", (req, res) => {
  res.status(404).send({
    msg: "Route does not exist",
  });
});

module.exports = userRouter;
