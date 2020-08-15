// const { PythonShell } = require("python-shell");
const MeCab = new require("mecab-async"),
  mecab = new MeCab();
const express = require("express");
// ルーティングする
const router = express.Router();

// routerにルーティングの動作を書いてく
router.get("/", function (req, res) {
  res.json({
    message: "Hello,world",
  });
});

/**
 * Post data : curl -X POST --data 'data=明日も晴れるといいですね' http://localhost:3000/api/v1/mecab/word
 * Resp data : [{"明日":"名詞"},{"も":"助詞"},{"晴れる":"動詞"},{"と":"助詞"},{"いい":"動詞"},{"です":"助動詞"},{"ね":"助詞"}]
 */
router.post("/mecab/word", function (req, res) {
  mecab.parse(req.body.data, function (err, result) {
    if (err) throw err;
    const data = result.map((d) => {
      let rObj = {};
      rObj[d[0]] = d[1];
      return rObj;
    });
    res.json(data);
  });
});

/**
 * Post data : curl -X POST --data 'data=明日も晴れるといいですね' http://localhost:3000/api/v1/mecab/num
 * Resp data : [{"名詞":1},{"助詞":3},{"動詞":2},{"助動詞":1}]
 */
router.post("/mecab/num", function (req, res) {
  mecab.parse(req.body.data, function (err, result) {
    if (err) throw err;
    const data = result
      .map((d1) => {
        let rObj = {};
        rObj[d1[1]] = 0;
        result.forEach((d2) => {
          if (d1[1] == d2[1]) {
            rObj[d1[1]] = Number(rObj[d1[1]]) + 1;
          }
        });
        return rObj;
      })
      .filter(
        (element, index, self) =>
          self.findIndex(
            (e) => Object.keys(e)[0] === Object.keys(element)[0]
          ) === index
      );
    res.json(data);
  });
});

/**
 * Post data : curl -X POST --data 'data=明日も晴れるといいですね' http://localhost:3000/api/v1/mecab/num
 * Resp data : {"名詞-副詞可能":1,"助詞-係助詞":1,"動詞-自立":2,"助詞-格助詞-引用":1,"助動詞":1,"助詞-終助詞":1}
 */
// router.post("/mecab/num", function (req, res) {
//   const pyshell = new PythonShell("main.py");
//   // sends a message to the Python script via stdin
//   pyshell.send(req.body.data);
//   pyshell.on("message", function (data) {
//     const jsonData = JSON.parse(data);
//     res.json(jsonData);
//   });
// });

//routerをモジュールとして扱う準備
module.exports = router;
