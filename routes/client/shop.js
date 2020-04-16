const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) =>
  res.send("<h1>hello world from Nodejs</h1>")
);

module.exports = router;
