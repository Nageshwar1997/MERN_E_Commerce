const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const { getUserIdFromToken } = require("../configs/jwtProvider");

const createUser = async (userData) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = userData;

    const isExistUser = await UserModel.findOne({ email });
    if (isExistUser) {
      throw new Error(`User already exists with email ${email}`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });
    console.log("User", user);
    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to create user");
  }
};

const findUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    // .populate("Address");

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
    const user = await UserModel.findOne({ email: email.toLowerCase() });

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

    console.log("User", user);

    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to find user");
  }
};

const getAllUsers = async () => {
  try {
    const users = await UserModel.find();
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
