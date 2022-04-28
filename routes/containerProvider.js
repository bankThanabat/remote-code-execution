const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

async function spawn_child_process(file_path, res, options = { language: "" }) {
  let stdout = "";
  let stderr = "";

  let _path = "";
  if (options.language === "php") {
    _path = "/var/www/html/" + file_path;
  } else {
    _path = "/usr/src/app/" + file_path;
  }

  var language_unique_command;
  if (options.language === "node") {
    language_unique_command = ["node:18-alpine3.14", "node"];
  } else if (options.language === "python") {
    language_unique_command = ["python:3.9", "python"];
  } else if (options.language === "php") {
    language_unique_command = ["php:7.4-fpm-alpine", "php"];
  } else {
    return res.status(400).json({ stdout: "", stderr: "invaild language" });
  }
  console.log({ path: path.dirname(path.dirname(_path)) });
  const child = spawn(
    "docker",
    [
      "run",
      "--rm",
      "-v",
      process.cwd() + ":" + path.dirname(path.dirname(_path)),
      ...language_unique_command,
      _path,
    ],
    { stdio: ["pipe", "pipe", "pipe"] }
  );

  child.on("spawn", (data) => {
    console.log("spawn successfully");
  });

  child.on("error", function (err) {
    console.log({ spwan_err: err });
    stderr = stderr + "internal error, plase try again";
    return res.status(500).json({ stdout, stderr });
  });

  child.stdout.on("data", (data) => {
    stdout = stdout + data.toString();
  });

  child.stderr.on("data", (data) => {
    stderr = stderr + data.toString();
  });

  child.on("close", (code) => {
    console.log({ stdout, stderr });
    deleteFile(path.join(process.cwd(), file_path));
    return res.status(200).json({ stdout, stderr });
  });
}

function deleteFile(path) {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { spawn_child_process };
