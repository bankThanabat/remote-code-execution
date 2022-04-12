const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost",
  })
);

app.use(express.json());

app.use("/v1", function (req, res) {
  res.status(200).json({ messeage: "Hello from express" });
});

module.exports = app;
