const mysql = require('mysql');
const express = require('express');
const app = express();

const conn = {
  host: "tolgu.ctejro5fgaj9.ap-northeast-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "Aa!23456",
  database: "team17",
}

app.get('/', function (req, res) {

  let connection = mysql.createConnection(conn);
  connection.connect();

  const testQuery = "SELECT * FROM Drawer";

  connection.query(testQuery, (error, result, field) => {
    if (error) {
      console.log("ERrror Execution :", error);
    }
    res.send(result);
  });
  connection.end();
});

app.listen(3000, () => console.log('start...'));