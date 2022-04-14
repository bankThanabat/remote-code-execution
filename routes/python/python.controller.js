const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const { v1: uuidv1 } = require("uuid");

require("dotenv").config();

const mode = process.env.MODE;
const configPath = process.env.TEMP_PATH;
const timeOut = parseInt(process.env.TIMEOUT);

async function httpPostPython(req, res) {
  var code = req.body.code;
  if (validate(code)) {
    var uniqueStr = uuidv1();
    var fileName = path.join(configPath, uniqueStr + ".py");

    try {
      fs.writeFileSync((file = fileName), (data = code), { encoding: "utf8" });

      var command = "python3 " + fileName;

      exec(command, { timeout: timeOut }, function (error, stdout, stderr) {
        if (error) {
          let errorMessage = "";

          if (error.toString().includes("ERR_CHILD_PROCESS_STDIO_MAXBUFFER")) {
            errorMessage =
              "Process terminated. 'maxBuffer' exceeded. This normally happens during an infinite loop.";
          } else if (error.signal === "SIGTERM") {
            errorMessage =
              "Process terminated. Please check your code and try again.";
          } else if (stderr) {
            errorMessage = stderr;
          } else {
            errorMessage = "Something went wrong. Please try again";
          }

          if (mode === "develop") throw new Error(stderr);

          deleteFile(fileName);
          return res.status(400).json({ stdout: "", stderr: errorMessage });
        }
        deleteFile(fileName);
        return res.status(200).json({ stdout: stdout, stderr: "" });
      });
    } catch (err) {
      if (mode === "develop") throw new Error("Error creating file: " + err);
      return res.status(400).json({
        stdout: "",
        stderr: "Can not create file, Please check your code and try again",
      });
    }
  } else {
    return res
      .status(400)
      .json({ stdout: "", stderr: "Something went wrong. Please try again" });
  }
}

function validate(str) {
  reg1 = RegExp(/\bimport\W+(?:\w+\W+){0,}(?:os|subprocess|importlib)\b/g);
  words = ["open(", "os"];

  if (str.match(reg1)) {
    return false;
  } else if (
    words.every((el) => str.toLowerCase().includes(el.toLowerCase()))
  ) {
    return false;
  }
  return true;
}

function deleteFile(path) {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    if (mode === "develop") throw new Error(err);
  }
}

module.exports = {
  httpPostPython,
};
