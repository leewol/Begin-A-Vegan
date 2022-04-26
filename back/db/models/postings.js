import Sequelize from "sequelize";

export default class Postings extends Sequelize.Model {
  static init(sequelize) {
    const options = {};
    options.sequelize = sequelize;
    options.tableName = "feed_postings";

    return super.init(
      {
        postId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        authorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        postTitle: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        postArticle: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        postFile: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        postDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false,
        },
        isDeleted: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
          allowNull: false,
        },
      },
      options,
    );
  }
}
