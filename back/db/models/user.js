import Sequelize from "sequelize";

export default class Users extends Sequelize.Model {
  static associate(models) {
    Users.hasMany(models.Postings, {
      foreignKey: "users_id",
    });
  }
  static init(sequelize) {
    const options = {};
    options.sequelize = sequelize;
    options.tableName = "users";

    return super.init(
      {
        id: {
          type: Sequelize.STRING(32),
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        is_vegan: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
        profile_url: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
      },
      options,
    );
  }
}
