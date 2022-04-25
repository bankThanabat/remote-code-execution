const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const internal = require("stream");

async function spawn_child_process(file_path, res) {
  let stdout = "";
  let stderr = "";

  const _path = "/usr/src/app/" + file_path;

  console.log({ _path });
  const child = spawn("docker", [
    "run",
    "--rm",
    "-v",
    process.cwd() + ":" + "/usr/src/app",
    "python:3.9",
    "python",
    _path,
  ]);

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
