import Sequelize from "sequelize";
import modelManager from "./models";
import dotenv from "dotenv";

class MysqlManager {
  constructor() {
    this.sequelize = null;
  }

  async connect() {
    try {
      this.sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
          dialect: "mysql",
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          define: {
            timestamps: false,
          },
          logging: false,
        },
      );

      await this.sequelize.authenticate();
      console.log(__filename, "Mysql connection has been established successfully");

      modelManager.initialize(this.sequelize);
    } catch (e) {
      console.log(__filename, `mysql connection failed: ${e}`);
    }
  }

  getTransaction() {
    return this.sequelize.transaction();
  }
}

const mysqlManager = new MysqlManager();

export default mysqlManager;
