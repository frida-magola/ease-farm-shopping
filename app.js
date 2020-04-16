const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/add-product", (req, res, next) => {
  res.send("Add product");
});
app.use("/message", (req, res, next) => {
  res.send("<h1>Message from express</h1>");
});
app.use("/", (req, res, next) => res.send("Hello from express"));

//create server
app.listen(PORT, () => {
  console.log(`Server started a port ${PORT}`);
});
