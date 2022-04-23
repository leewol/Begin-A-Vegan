import { readFileSync } from "fs";
const data = readFileSync("./config/config.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: conf.MYSQL_HOST,
	user: conf.MYSQL_USERNAME,
	password: conf.MYSQL_PASSWORDS,
	database: conf.MYSQL_DBNAME,
});

connection.connect();

connection.connect((err) => {

	if (err) {

		console.log(err);
		connection.end();
		throw err;
    
	} else {

		console.log("DB접속 성공!");
    
	}

});

export default connection;