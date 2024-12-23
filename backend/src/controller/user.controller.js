const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    // if (!req.headers) {
    //   return res.status(401).json({
    //     success: false,
    //     error: true,
    //     message: "Headers not found",
    //   });
    // }
    // if (!req.headers.authorization) {
    //   return res.status(401).json({
    //     success: false,
    //     error: true,
    //     message: "Authorization not found",
    //   });
    // }

    const jwt = req.headers.authorization.split(" ")[1];

    if (!jwt) {
      return res.status(404).send({
        message: "Token not found",
      });
    }

    const user = await userService.getUserProfileByToken(jwt);

    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     error: true,
    //     message: "User not found",
    //   });
    // }

    // return res.status(200).json({
    //   success: true,
    //   error: false,
    //   message: "User profile retrieved successfully",
    //   user,
    // });

    return res.status(200).send(user);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).send({
      error: error.message || "Failed to retrieve user profile",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).send(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).send({
      error: error.message || "Failed to retrieve users",
    });
  }
};

module.exports = {
  getUserProfile,
  getAllUsers,
};
