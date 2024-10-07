const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const { getUserIdFromToken } = require("../providers/jwt.provider");
const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, mobileNumber } = userData;

    const isUserExist = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

    if (isUserExist) {
      throw new Error(`User already exists with email ${email}`);
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const user = new User({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      mobileNumber,
    });

    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error(error.message || "Failed to create user");
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    // .populate("addresses");

    if (!user) {
      throw new Error(`User not found with id ${userId}`);
    }

    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to find user");
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

    if (!user) {
      throw new Error(`User not found with email ${email}`);
    }

    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to find user");
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = await getUserIdFromToken(token);
    const user = await findUserById(userId);

    if (!user) {
      throw new Error(`User not found with id ${userId}`);
    }
    // console.log("User", user);
    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to find user");
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message || "Failed to get users");
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
