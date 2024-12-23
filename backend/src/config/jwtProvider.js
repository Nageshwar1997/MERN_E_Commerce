const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
