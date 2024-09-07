const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Server connected to MongoDB");
  } catch (error) {
    console.error(error.message || "Failed to connect to MongoDB");
    process.exit(1);
  }
};

module.exports = connectDB;
