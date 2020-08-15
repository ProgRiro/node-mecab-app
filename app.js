const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );
  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

const port = process.env.PORT || 5000;

/**
 * /routes/v1/index.jsをrouterとして読み込み
 * それを/api/v1/のapiとして使うという処理
 */
const router = require("./routes/v1/");
app.use("/api/v1/", router);

//サーバ起動
app.listen(port);
console.log("listen on port " + port);
