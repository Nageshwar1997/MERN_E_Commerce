const jwt = require("jsonwebtoken");

const generateToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });
    if (!token) {
      throw new Error("Failed to generate token");
    }
    return token;
  } catch (error) {
    throw new Error(error.message || "Failed to generate token");
  }
};

const getUserIdFromToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decodedToken) {
      throw new Error("Failed to decode token");
    }
    return decodedToken.userId;
  } catch (error) {
    throw new Error(error.message || "Failed to decode token");
  }
};

module.exports = { generateToken, getUserIdFromToken };
