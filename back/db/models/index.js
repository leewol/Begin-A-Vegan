import Comment from "./comment";
import Posting from "./posting";
import User from "./user";

class ModelManager {
  initialize(sequelize) {
    // 각각 모델의 dependency가 있기 때문에 순서에 맞게 sync를 해야 합니다.
    User.init(sequelize);
    Posting.init(sequelize);
    Comment.init(sequelize);

    User.sync();
    Posting.sync();
    Comment.sync();
  }
}

const modelManager = new ModelManager();

export default modelManager;
