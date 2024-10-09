const bcrypt = require("bcryptjs");

const { createCart } = require("../services/cart.service");
const {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} = require("../helpers/auth.validation.regex");
const { generateToken } = require("../providers/jwt.provider");
const { createUser, getUserByEmail } = require("../services/user.service");
const User = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobileNumber } = req.body;

    if (!firstName) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "First name is required",
      });
    }

    if (!lastName) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Last name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email is required",
      });
    }

    if (email && !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid email format (eg. abc123@example.com)",
      });
    }

    if (!mobileNumber) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Mobile number is required",
      });
    }

    if (mobileNumber && !validateMobileNumber(mobileNumber)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid mobile number format (eg. +911234567890)",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password is required",
      });
    }

    if (password && !validatePassword(password)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User already exists with this email",
      });
    }
    const user = await createUser({
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
    });

    const token = await generateToken(user._id);

    await createCart(user);

    return res.status(201).json({
      success: true,
      error: false,
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to create user",
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password is required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid email format (eg. abc123@example.com)",
      });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: `User not found with email ${email}`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid password",
      });
    }

    const token = await generateToken(user._id);

    return res.status(200).json({
      success: true,
      error: false,
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error during user login:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Failed to login user",
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
