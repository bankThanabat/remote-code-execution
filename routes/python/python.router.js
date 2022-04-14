const express = require("express");

const { httpPostPython } = require("./python.controller");

const pythonRouter = express.Router();

pythonRouter.post("/", httpPostPython);

module.exports = pythonRouter;
