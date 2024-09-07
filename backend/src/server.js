const app = require(".");
const connectDB = require("./configs/db");

const PORT = process.env.PORT || 5454;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}.`);
  } catch (error) {
    throw new Error(error.message || "Failed to start the server");
  }
});
