import fs from "fs";

class ModelManager {

	initialize(sequelize) {

		// "__dirname": 유동적으로 모델이름 바꿔 넣어주기
		const modelNames = fs.readdirSync(__dirname);
		modelNames
		// index파일이랑 숨은 파일 제외시키기
			.filter((modelName) => {

				return (modelName.indexOf(".") !== 0) 
                && (modelName !== "index.js");
    
			})
		// 각 모델 초기 sequelize 설정하기 
			.forEach((modelName) => {

				require(`./${modelName}`).default.init(sequelize);
    
			});
  
	}

}


const modelManager = new ModelManager();

export default modelManager;