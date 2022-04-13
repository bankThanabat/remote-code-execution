const express = require("express");
const cors = require("cors");
const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost",
  })
);

app.use(express.json());

app.use("/v1/api", api);

module.exports = app;
