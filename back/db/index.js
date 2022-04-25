import Sequelize from "sequelize";
import modelManager from "./models";

class MysqlManager {
  constructor() {
    this.sequelize = null;
  }

  async connect() {
    try {
      this.sequelize = new Sequelize(
        process.env.DBNAME,
        process.env.DBUSERNAME,
        process.env.PASSWORD,
        {
          dialect: "mysql",
          host: process.env.HOST,
          port: process.env.PORT,
          define: {
            timestamps: false,
          },
          logging: false,
        },
      );

      await this.sequelize.authenticate();
      console.log(
        __filename,
        "Mysql connection has been established successfully",
      );

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
