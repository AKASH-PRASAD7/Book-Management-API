const bookmodel = require("../Models/Book-model");
const usermodel = require("../Models/User-model");

exports.getAllUsers = async (req, res) => {
  const users = await usermodel.find();
  if (users.length === 0) {
    return res.status(404).json({
      sucess: false,
      message: "No books found",
    });
  }

  res.status(200).json({
    sucess: true,
    data: users,
  });
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await usermodel.findById(id);
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
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updateuser = await usermodel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...data,
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    sucess: true,
    data: updateuser,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await usersmodel.deleteOne({
    _id: id,
  });
  if (!user) {
    return res.status(404).json({
      sucess: false,
      message: "User does not exist",
    });
  }

  return res.status(200).json({
    sucess: true,
    message: "User deleted",
  });
};
