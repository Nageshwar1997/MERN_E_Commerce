const app = require(".");

const PORT = process.env.PORT || 5454;

app.listen(PORT, () => {
  console.log(`E-commerce app listening on port: ${PORT}`);
});
