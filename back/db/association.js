import Sequelize from "sequelize";
import modelManager from "./models/index";
import mysqlManager from "./index";
import Users from "./models/user";
import Postings from "./models/postings";

const sequelize = mysqlManager;

const db = {};

db.sequelize = sequelize;

db.Users = Users;
db.Postings = Postings;

Users.init(sequelize);
Postings.init(sequelize);

Users.associate(db);
Postings.associate(db);

export default db;
