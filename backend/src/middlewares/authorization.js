const { getUserIdFromToken } = require("../configs/jwtProvider");
const { findUserById } = require("../services/user.service");

const adminAuthorization = async (req, res, next) => {
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
        message: "Admin not found",
      });
    }

    if (user.role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to authorize admin",
    });
  }
};

module.exports = adminAuthorization;
