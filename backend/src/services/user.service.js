// const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    if (isUserExist) {
      throw new Error(`User already exists with email ${email}`);
    }

    password = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...userData,
      firstName,
      lastName,
      email,
      password,
    });
    console.log("created user", user);
    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to create user");
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    // .populate("address");

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
    const userId = await jwtProvider.getUserIdFromToken(token);
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
