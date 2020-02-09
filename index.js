console.log("Server loading...");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const moment = require('moment-timezone');
const jsSHA = require("jssha");
const app = express();
const HTTP_PORT = 80;
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
app.get('/', (req, res) => res.send('Server is up!'))
app.get('/login', (req, res) => {
  let shaHasher = new jsSHA("SHA-256", "TEXT");
  shaHasher.update(req.query.email);
  con.query("SELECT * FROM users WHERE ? ", {
    email: req.query.email,
    password: shaHasher.getHash("HEX")
  }, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

app.post('/register', (req,res) => {
  let shaHasher = new jsSHA("SHA-256", "TEXT");
  shaHasher.update(req.query.name+req.body.email+req.body.password+ new Date().toString());
  userHashedID = shaHasher.getHash("HEX");
  console.log(req.body);
  con.query("INSERT INTO users SET ?",{
    user_id: userHashedID,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber
  }, (error, result) => {
    if (error) throw error;
    res.send(result["affectedRows"]);
  })
})

app.listen(HTTP_PORT);
