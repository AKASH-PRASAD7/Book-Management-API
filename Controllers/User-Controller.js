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

exports.createUser = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "Please provide data",
    });
  }

  await usermodel.create(data);

  const users = await usermodel.find();

  if (users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No user found",
    });
  }

  return res.status(200).json({
    success: true,
    data: users,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  let User = await usermodel.findById(id);
  if (!User) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const updatedUserData = await usermodel.findOneAndUpdate(
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

  return res.status(200).json({
    success: true,
    data: updatedUserData,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await usermodel.deleteOne({
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

exports.getSubDetails = async (req, res) => {
  const { id } = req.params;
  const user = usermodel.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
    // } else if (!user.issuedBook) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User did not issued any book",
    //   });
  }
  // Returns date in Days from 1 Jan 1970
  const dateInDays = (data = "") => {
    let date;
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

  // Return sub days left
  const subDays = (user1) => {
    let days;
    if (user1.sub_type === "basic") {
      days = dateInDays(user1.sub_date) + 30;
      return cuurentdate >= days ? 0 : days - cuurentdate;
    } else if (user1.sub_type === "standard") {
      days = dateInDays(user1.sub_date) + 90;
      return cuurentdate >= days ? 0 : days - cuurentdate;
    } else if (user1.sub_type === "premium") {
      days = dateInDays(user1.sub_date) + 365;
      return cuurentdate >= days ? 0 : days - cuurentdate;
    }
  };

  let subDaysleft = subDays(user);
  let returnDate = dateInDays(user.return_date);
  let subExpired = subDaysleft > 0 ? false : true;

  let fine = cuurentdate > returnDate ? 69 : 0;
  let extrafine = subDaysleft > 0 ? 0 : 169;
  fine += extrafine;

  const data = {
    ...user._doc,
    subDaysleft,
    fine,
    subExpired,
  };

  return res.status(200).json({
    success: true,
    data: data,
  });
};
