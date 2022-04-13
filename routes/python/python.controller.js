const fs = require("fs");
const pythonValidater = require("../../util/codeValidater");

require("dotenv").config();

async function httpPostPython(req, res) {
  // get code from req
  if (pythonValidater(req.body.code)) {
    return res.status(200).json({ message: "python result" });
  }
  /* 
    check denger code
    write file
    exec file
    return file output 
    del file
    */
  return res.status(400).json({ message: "exec fail" });
}

async function httpGetPython(req, res) {
  return res.status(200).json({ message: "exec result" });
}

module.exports = {
  httpPostPython,
  httpGetPython,
};
