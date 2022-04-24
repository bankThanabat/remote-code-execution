const express = require("express");

const { httpPostPython } = require("./python.controller");

const pythonRouter = express.Router();

pythonRouter.post("/", httpPostPython);

pythonRouter.get("/", (req, res) => {
  res.status(200).json({ message: "ok" });
});

module.exports = pythonRouter;
