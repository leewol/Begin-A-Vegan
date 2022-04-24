import cors from "cors";
import "dotenv/config";
import Sequelize from "sequelize";
import modelManager from "./src/models";
import { sysLog, sysErrorLog } from "./src/utils/logger.js";
import { DatabaseError } from "./src/utils/errors.js";

const express = require('express');
const swaggerDocument = require('./src/swagger.json');
const { swaggerUi, specs } = require('./src/modules/swagger');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.SERVER_PORT || 5000;

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true }));

  // swagger 확인용
  app.post("/check", (req, res) => {
    console.log(req.body);
    res.json({isStatus: 200});
  })

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});

const mysqlManager = new MysqlManager()

export default mysqlManager