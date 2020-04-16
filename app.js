const express = require("express");

const bodyParser = require("body-parser");

//import routes
const adminRoutes = require("./routes/admin/admin");
const clientRoutes = require("./routes/client/shop");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));

//register routes
app.use(adminRoutes);
app.use(clientRoutes);

//page not found 404 error
app.use((req, res) => res.status(404).send("<h1>Page not found</h1>"));

//create server
app.listen(PORT, () => {
  console.log(`Server started a port ${PORT}`);
});
