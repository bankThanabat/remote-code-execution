const express = require("express");

const pythonRouter = require("./python/python.router");

const api = express.Router();

api.use("/python", pythonRouter);

module.exports = api;
