const { PythonShell } = require("python-shell");

const pyshell = new PythonShell("main.py");

// sends a message to the Python script via stdin
pyshell.send("明日も晴れるといいですね");

pyshell.on("message", function (data) {
  // received a message sent from the Python script (a simple "print" statement)
  const jsonData = JSON.parse(data);
  console.log(jsonData);
});
