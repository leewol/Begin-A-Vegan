import { postingService } from "../services"
import { UPDATE_SUCCESS, FAIL } from "../utils/code"

const postingController = async (req, res, next) => {
    postings_id = req.params.id;
    raw = req.body;

    const result = postingService.updatePosting(postings_id, raw);


    const code = result.code;
    switch (code) {
        case UPDATE_SUCCESS:
            res.status(200).json({ data: result.data });
            break;
        case FAIL:
            res.status(400).json({ message: result.message });
            break;
        default:
            res.status(400).json({ message: "정의되지 않은 동작!" });
    }
}

export {
    postingController
}