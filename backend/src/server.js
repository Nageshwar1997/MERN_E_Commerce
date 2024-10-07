const app = require("./");
const connectDB = require("./configs/db.config");

const PORT = process.env.PORT || 5454;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}.`);
});
