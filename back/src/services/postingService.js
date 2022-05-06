import { response } from 'express';
import { getSuccesResponse, nonDataSuccessResponse, failResponse } from "../utils/form"
import { UPDATE_SUCCESS, FAIL } from "../utils/code"


class PostingService {
    async updatePosting(postings_id, raw) {
        const posting = await Postings.findOne({ where: { id: postings_id } });
        if (!posting) {
            return failResponse("FAIL", "fail to get posting!!");
        }

        const result = await Postings.update({ article: req.body.article }, { where: { id: raw.id } });

        return nonDataSuccessResponse(UPDATE_SUCCESS);
    }
}

postingService = new PostingService()

export {
    postingService
}
