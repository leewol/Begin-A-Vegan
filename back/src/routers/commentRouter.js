import express from "express";
import Comments from "../../db/models/comments";
import mysqlManager from "../../db";
import Sequelize from "sequelize";

const commentRouter = express.Router();

// 댓글 생성
commentRouter.post("/comments/comment", login_required, async (req, res, next) => {
  try {
    const comments = {
      users_id: req.currentUserId,
      postings_id: req.body.postings_id,
      content: req.body.content,
    };

    const result = await Comments.create(comments);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//create한 다음에 게시판 목록 페이지로 가게 하고싶음
// commentRouter.get("/comments", async function (req, res, next) {
//   comments.findAll().then((result) => {
//     res.render("show", {
//       comments: result,
//     });
//   });
// });

// 특정 게시글의 모든 댓글 조회
commentRouter.get("/postings/:postings_id/comments", async function (req, res, next) {
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

// 댓글 수정
commentRouter.put("/comments/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    Comments.update(
      {
        users_id: req.body.users_id,
        postings_id: req.body.postings_id,
        content: req.body.content,
      },
      {
        where: { id: id },
      },
    ).then((result) => {
      console.log("게시글 수정 완료");
      res.redirect("/comments");
    });
  } catch (error) {
    next(error);
  }
});

// 댓글 삭제
commentRouter.delete("/comments/:id", function (req, res, next) {
  const id = req.params.id;

  comments
    .destroy({
      where: { id: id },
    })
    .then((result) => {
      res.redirect("/comments");
    })
    .catch((error) => {
      next(error);
    });
});

export default commentRouter;
