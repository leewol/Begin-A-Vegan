import Sequelize from "sequelize";

class Postings extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(32),
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        users_id: {
          type: Sequelize.STRING(32),
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
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
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscore: false,
        modelName: "Postings",
        tableName: "postings",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }
  static associate(models) {
    Postings.belongsTo(models.Users, {
      foreignKey: "users_id",
      targetkey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    Postings.hasMany(models.Comments, {
      foreignKey: "id",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    Postings.belongsToMany(models.Users, { through: "like_users_postings", as: "Likers" });
  }
}

export default Postings;
