const bcrypt = require("bcrypt");
const { generateToken } = require("../configs/jwtProvider");
const { createUser, getUserByEmail } = require("../services/user.service");
const { createCart } = require("../services/cart.service");
const UserModel = require("../models/user.model");

const registerUserController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

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
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Phone number is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Password is required",
      });
    }

    // Validate email format (simple example, consider using a library for more robust validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid email format",
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User already exists with this email",
      });
    }

    // Create new user
    const user = await createUser({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      phoneNumber,
      password,
    });

    // Generate token
    const token = await generateToken(user._id);

    // Create cart
    await createCart(user);

    return res.status(201).json({
      success: true,
      error: false,
      message: "User created successfully",
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

const loginUserController = async (req, res) => {
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

    // Validate email format (simple example; consider using a library for more robust validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid email format",
      });
    }

    // Retrieve user by email
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: `User not found with email ${email}`,
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Invalid password",
      });
    }

    // Generate token
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

module.exports = { registerUserController, loginUserController };
