import express from "express";
import mysqlManager from "../../db";
import Sequelize from "sequelize";
import Comments from "../../db/models/comment";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import { login_required } from "../middlewares/login_required";

const commentRouter = express.Router();

// 댓글 생성
commentRouter.post("/:postings_id/comments/comment", login_required, async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comments.create({
      users_id: req.user.id,
      postings_id: req.params.postings_id,
      content: req.body.content,
    });
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

// 댓글 수정
commentRouter.put(
  "/postings/:postings_id/comments/:comments_id",
  login_required,
  async (req, res, next) => {
    try {
      const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
      if (!posting) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      await Comments.update(
        { content: req.body.content },
        { where: { id: req.params.comments_id } },
      );
      const updatedComment = await Comments.findOne({
        where: { id: req.params.comments_id },
        include: [
          {
            model: Users,
            attributes: ["nickname", "profile_url"],
          },
        ],
      });
      res.status(200).json(updatedComment);
    } catch (error) {
      next(error);
    }
  },
);

// 댓글 삭제
commentRouter.delete(
  "/postings/:postings_id/comments/:comments_id",
  login_required,
  async (req, res, next) => {
    try {
      const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
      if (!posting) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      Comments.destroy({
        where: { id: req.params.comments_id },
      });
      res.json({
        postings_id: req.params.postings_id,
        comments_id: req.params.comments_id,
        users_id: req.user.id,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default commentRouter;
