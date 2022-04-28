const express = require("express");

const { httpPostPhp } = require("./php.controller");

const phpRouter = express.Router();

phpRouter.post("/", httpPostPhp);

phpRouter.get("/", (req, res) => {
  res.status(200).json({ message: "ok from php" });
});

module.exports = httpPostPhp;
