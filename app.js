const express = require("express");

const bodyParser = require("body-parser");

//import routes
const adminRoutes = require("./routes/admin/admin");
const clientRoutes = require("./routes/client/shop");
const pageNotFound = require("./routes/404");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));

//register routes
app.use("/admin", adminRoutes); //filter path
app.use(clientRoutes);

//page not found 404 error
app.use(pageNotFound);

//create server
app.listen(PORT, () => {
  console.log(`Server started a port ${PORT}`);
});
