const fs = require("fs");
const path = require("path");
const { v1: uuidv1 } = require("uuid");
const { spawn_child_process } = require("../containerProvider");

require("dotenv").config();

const mode = process.env.MODE;
const configPath = process.env.TEMP_PATH;
const timeOut = parseInt(process.env.TIMEOUT);

async function httpPostPhp(req, res) {
  var code = req.body.code;

  if (validate(code)) {
    var uniqueStr = uuidv1();

    var file_path = `${configPath}/${uniqueStr}.php`;

    try {
      fs.writeFileSync((file = file_path), (data = code), {
        encoding: "utf8",
      });
    } catch (err) {
      if (mode === "develop") throw new Error("Error creating file: " + err);
      return res.status(400).json({
        stdout: "",
        stderr:
          "Can not create file, Please check your code and try again" + err,
      });
    }

    await spawn_child_process(file_path, res, { language: "php" });
  } else {
    return res.status(400).json({
      stdout: "",
      stderr: "Something went wrong. Please check your code and try again",
    });
  }
}

function validate(str) {
  return true;
}

module.exports = {
  httpPostPhp,
};
