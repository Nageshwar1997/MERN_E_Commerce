const { getUserProfileByToken } = require("../services/user.service");
const { getAllUsers } = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    if (!req.headers) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Headers not found",
      });
    }
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Authorization not found",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Token not found",
      });
    }

    const user = await getUserProfileByToken(token);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: false,
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to retrieve user profile",
    });
  }
};

const getAllUsersProfiles = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to retrieve users",
    });
  }
};

module.exports = {
  getUserProfile,
  getAllUsersProfiles,
};
