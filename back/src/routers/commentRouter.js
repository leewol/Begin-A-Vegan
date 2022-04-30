import express from "express";
import Comments from "../../db/models/comments";
import Users from "../../db/models/user";
import mysqlManager from "../../db";
import Sequelize from "sequelize";

const commentRouter = express.Router();

// 댓글 생성
commentRouter.post("/:postings_id/comment", async (req, res, next) => {
  try {
    const comments = {
      users_id: req.body.users_id,
      postings_id: req.params.postings_id,
      content: req.body.content,
    };
    const fullComment = Comment.findOne({
      where: { id: comments.id },
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

/** ## 게시글 조회할 때, 그 게시글의 댓글들 모두 불러옴으로 이 router는 필요없다고 판단

// 특정 게시글의 모든 댓글 조회 -
commentRouter.get("/postings/:postings_id/comments", async (req, res, next) => {
  try {
    const postings_id = req.params.id;
    Comments.findAll({
      where: { id: postings_id },
    }).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    next(error);
  }
});
*/

// 댓글 수정
commentRouter.put("/:postings_id/comments/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const postings_id = req.params.id;

    await Comments.update({ content: req.body.content }, { where: { id } });
    const updatedComment = await Comments.findOne({
      where: { id },
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
commentRouter.delete("/:postings_id/comments/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    Comments.destroy({
      where: { id },
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
