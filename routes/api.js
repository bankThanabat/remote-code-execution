const express = require("express");

const pythonRouter = require("./python/python.router");
const nodeRouter = require("./node/node.router");
const phpRouter = require("./php/php.router");
const api = express.Router();

api.use("/python", pythonRouter);
api.use("/node", nodeRouter);
api.use("/php", phpRouter);

module.exports = api;
