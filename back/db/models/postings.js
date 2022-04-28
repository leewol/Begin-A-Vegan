import Sequelize from "sequelize";

export default class Postings extends Sequelize.Model {
  static associate(models) {
    Postings.belongsTo(models.Users, {
      foreignKey: {
        fieldName: "users_id",
        allowNull: true,
      },
      targetKey: "id",
    });
  }
  static init(sequelize) {
    const options = {};
    options.sequelize = sequelize;
    options.tableName = "postings";

    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        users_id: {
          type: Sequelize.UUID,
          allowNull: true,
          reference: {
            model: "Users",
            key: "id",
          },
        },
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        article: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        file_url: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
          allowNull: false,
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
          allowNull: false,
        },
      },
      options,
    );
  }
}
