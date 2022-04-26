import Sequelize from "sequelize";

export default class Users extends Sequelize.Model {
    static init(sequelize) {
        const options = {};
        options.sequelize = sequelize;
        options.tableName = "users";

        return super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, options);
    };
};