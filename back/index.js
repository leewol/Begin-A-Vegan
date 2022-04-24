import Sequelize from "sequelize";
const express = require('express');
import modelManager from "./models";
import { sysLog, sysErrorLog } from "./utils/logger.js";
import { DatabaseError } from "./utils/errors.js";

const app = express();

class MysqlManager {
  constructor() {
    this.sequelize = null
  }

  async connect(config) {
    try {
      this.sequelize = new Sequelize(
        config.database,
        config.username,
        config.password, {
          dialect: "mysql",
          port: config.host,          
          logging: false,
        },
      );

      await this.sequelize.authenticate();
      console.log(__filename, "Mysql connection has been established successfully");

      ModelManager.initialize(this.sequelize);
    } catch(e) {
      console.log(__filename, `mysql connection failed: ${e}`);
    }
  }

  getTransaction() {
    return this.sequelize.transaction()
  }
}

app.get('/', function (req, res) {
  res.send('Hello Express');
});

app.listen(3000, () => console.log('start...'));

const mysqlManager = new MysqlManager()

export default mysqlManager