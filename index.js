console.log("Server loading...");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const moment = require('moment-timezone');
const app = express();
const HTTP_PORT = 8088;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kamui2020",
  port: "3306",
  database: "kamui"
});
con.connect();

app.use(express.static("public"));
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json
app.use(bodyParser.json())
//headers
app.use(function(req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware()
  next();
});

app.listen(HTTP_PORT);
