const express = require("express");
const userRouter = express.Router();

const { users } = require("../Data/Users.json"); //data import

//controllers
const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  createUser,
  getSubDetails,
} = require("../Controllers/User-Controller");

/**
 * Route: Users
 * Method: GET
 * Description: Get all Users
 * Acess: Public
 * Paramenters: none
 */
userRouter.get("/", getAllUsers);

/**
 * Route: User/:id
 * Method: GET
 * Description: Get Users by
 * Acess: Public
 * Paramenters: id
 */

userRouter.get("/:id", getUserById);

/**
 * Route: Users
 * Method: POST
 * Description: Create new user
 * Acess: Public
 * Paramenters: none
 */
userRouter.post("/", createUser);

/**
 * Route: User/:id
 * Method: PUT
 * Description: Upadating user data
 * Acess: Public
 * Paramenters: id
 */

userRouter.put("/:id", updateUser);

/**
 * Route: User/:id
 * Method: DELETE
 * Description: Deleting a User by ID
 * Acess: Public
 * Paramenters: id
 */
userRouter.delete("/:id", deleteUser);
/**
 * Route: /users/subscription-details/{id}
 * Method: GET
 * Description: Getting users subscription details with fine
 * Acess: Public
 * Paramenters: id
 */

userRouter.get("/sub-details/:id", getSubDetails);

module.exports = userRouter;
