import fs from "fs";

class ModelManager {
  initialize(sequelize) {
    const modelNames = fs.readdirSync(__dirname);
    modelNames
    .filter((modelName) => {
      return (modelName.indesOf(".") !== 0) && (modelName !== "index.js");
    })
    .forEach((modelName) => {
      require(`./${modelName}`).default.init(sequelize);
    });
  };
}

const modelManager = new ModelManager();

export default modelManager;