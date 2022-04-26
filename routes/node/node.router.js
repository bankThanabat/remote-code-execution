const express = require("express");

const { httpPostNode } = require("./node.controller");

const nodeRouter = express.Router();

nodeRouter.post("/", httpPostNode);

nodeRouter.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

module.exports = nodeRouter;
