const express = require("express");

const pythonRouter = require("./python/python.router");
const nodeRouter = require("./node/node.router");

const api = express.Router();

api.use("/python", pythonRouter);
api.use("/node", nodeRouter);

module.exports = api;
