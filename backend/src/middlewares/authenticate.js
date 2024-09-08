const { getUserIdFromToken } = require("../configs/jwtProvider");
const { findUserById } = require("../services/user.service");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Token not found",
      });
    }

    const userId = await getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid token",
      });
    }

    const user = await findUserById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to authenticate user",
    });
  }
};

module.exports = authenticateUser;
