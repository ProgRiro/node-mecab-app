const { PythonShell } = require("python-shell");
var express = require("express");
// ルーティングする
var router = express.Router();

// routerにルーティングの動作を書いてく
router.get("/", function (req, res) {
  res.json({
    message: "Hello,world",
  });
});

router.post("/mecab", function (req, res) {
  const pyshell = new PythonShell("main.py");
  // sends a message to the Python script via stdin
  pyshell.send(req.body.data);
  pyshell.on("message", function (data) {
    // received a message sent from the Python script (a simple "print" statement)
    const jsonData = JSON.parse(data);
    console.log(jsonData);
    res.json(jsonData);
  });
});

//routerをモジュールとして扱う準備
module.exports = router;
