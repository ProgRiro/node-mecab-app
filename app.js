const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

/**
 * /routes/v1/index.jsをrouterとして読み込み
 * それを/api/v1/のapiとして使うという処理
 */
const router = require("./routes/v1/");
app.use("/api/v1/", router);

//サーバ起動
app.listen(port);
console.log("listen on port " + port);
