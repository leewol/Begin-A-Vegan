import Postings from "../../db/models/postings";
import { v4 as uuidv4 } from "uuid";

class postingService {
  static async addPosting({ postTitle, postArticle, postFile }) {
    const postId = uuid.v4();

    const newPosting = {
      id: postId,
      postTitle,
      postArticle,
      postFile,
    };

    createdNewPosting.errorMessage = null; // 문제없이 저장되었음으로 에러 없음

    return createdNewPosting;
  }

  static async getPosting({ postId }) {
    const posting = await Postings.findById({ postId });
    return posting;
  }
}

export default postingService;
