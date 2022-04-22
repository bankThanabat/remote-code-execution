const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

async function spawn_child_process(file_path, res) {
  let stdout = "";
  let stderr = "";

  const target_path = "/usr/src/app/" + file_path;
  const windown_path = path.join(
    "C:/Users/code/remote_code_execution",
    file_path
  );

  const child = spawn("docker", [
    "run",
    "--rm",
    "-v",
    "C:/Users/code/remote_code_execution" + ":" + "/usr/src/app",
    "python:3.9",
    "python",
    target_path,
  ]);

  child.on("spawn", (data) => {
    console.log("spawn successfully");
  });

  child.stdout.on("data", (data) => {
    stdout = stdout + data.toString();
  });

  child.stderr.on("data", (data) => {
    stderr = stderr + data.toString();
  });

  child.on("close", (code) => {
    console.log({ stdout, stderr });
    deleteFile(windown_path);
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
