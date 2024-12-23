const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");
const authenticate = async (req, res, next) => {
  try {
    //   if (!req.headers) {
    //     return res.status(401).json({
    //       success: false,
    //       error: true,
    //       message: "Headers not found",
    //     });
    //   }

    //   if (!req.headers.authorization) {
    //     return res.status(401).json({
    //       success: false,
    //       error: true,
    //       message: "Authorization not found",
    //     });
    //   }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        error: "Token not found",
      });
    }

    const userId = await jwtProvider.getUserIdFromToken(token);

    const user = await userService.findUserById(userId);

    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
  next();
};

module.exports = authenticate;
