import express from "express";
import Postings from "../../db/models/postings";
import mysqlManager from "../../db";
import { postingService } from "../services/postingService";

const postingRouter = express.Router();

postingRouter.post("/posting/create", async function (req, res) {
  try {
    const posting = {
      postTitle: req.body.postTitle,
      postArticle: req.body.postArticle,
      postFile: req.body.postFile,
    };

    const newPosting = await postingService.addPosting({ posting });

    if (newPosting.errorMessage) {
      throw new Error(newPosting.errorMessage);
    }
    res.status(201).json(newPosting);
  } catch (error) {
    console.log(error);
  }
});

postingRouter.get("/posting/:id", async function (req, res) {
  try {
    const postId = req.params.id;
    const posting = await postingService.getPosting({ postId });

    if (posting.errorMessage) {
      throw new Error(posting.errorMessage);
    }

    res.status(200).json(posting);
  } catch (error) {
    console.log(error);
  }
});

export default postingRouter;
