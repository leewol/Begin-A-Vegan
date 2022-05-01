import express from "express";
import mysqlManager from "../../db";
import Sequelize from "sequelize";
import Comments from "../../db/models/comments";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";

const commentRouter = express.Router();

// 댓글 생성
commentRouter.post("/:postings_id/comment", async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      users_id: req.body.users_id,
      postings_id: req.params.postings_id,
      content: req.body.content,
    });
    const fullComment = Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: Users,
          attributes: ["id", "nickname", "profile_url"],
          order: ["created_at", "DESC"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    next(error);
  }
});

// 댓글 수정
commentRouter.put("/:postings_id/comments/:id", async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comments.findOne({ where: { id: req.params.id } });
    await comment.update({ content: req.body.content }, { where: { id: req.params.id } });
    const updatedComment = await Comments.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["id", "nickname", "profile_url"],
        },
      ],
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

// 댓글 삭제
commentRouter.delete("/:postings_id/comments/:id", async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    Comments.destroy({
      where: { id: req.params.id },
    });
    res.json({
      postings_id: req.params.postings_id,
      id: req.params.id,
      users_id: req.body.users_id,
    });
  } catch (error) {
    next(error);
  }
});

export default commentRouter;
