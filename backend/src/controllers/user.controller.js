const {
  getUserProfileByToken,
  getAllUsers,
} = require("../services/user.service");

const getUserProfile = async (req, res) => {
  try {
    // Extract JWT token from Authorization header
    const jwtToken = req.headers.authorization?.split(" ")[1];

    if (!jwtToken) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Token not found",
      });
    }
    console.log("Token", jwtToken);
    

    // Retrieve user profile using the token
    const user = await getUserProfileByToken(jwtToken);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    // Return user profile if found
    return res.status(200).json({
      success: true,
      error: false,
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    // Log and return the error
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
    // Fetch all users
    const users = await getAllUsers();

    // Return successful response with user data
    return res.status(200).json({
      success: true,
      error: false,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error retrieving users:", error);

    // Return error response
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
