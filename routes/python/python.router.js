const express = require("express");

const { httpPostPython, httpGetPython } = require("./python.controller");

const pythonRouter = express.Router();

pythonRouter.get("/", httpGetPython);
pythonRouter.post("/", httpPostPython);

module.exports = pythonRouter;
