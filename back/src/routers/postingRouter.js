import express from "express";
import Postings from "../../db/models/postings";
import mysqlManager from "../../db";
import Sequelize from "sequelize";

const postingRouter = express.Router();

// Posting Create
postingRouter.post("/postings/posting", async (req, res, next) => {
  const posting = {
    users_id: req.body.users_id,
    title: req.body.title,
    article: req.body.article,
    file_url: req.body.file_url,
  };
  await Postings.create(posting)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      next(error);
    });
});

//create한 다음에 게시판 목록 페이지로 가게 하고싶음
// postingRouter.get("/postings", async function (req, res, next) {
//   Postings.findAll().then((result) => {
//     res.render("show", {
//       postings: result,
//     });
//   });
// });

// Posting 1개 Get
postingRouter.get("/postings/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    Postings.findOne({
      where: { id: id },
    }).then((result) => {
      posting: result;
      res.status(200).json(result);
    });
  } catch (error) {
    next(error);
  }
});

// Posting Update
postingRouter.put("/postings/:id", async function (req, res, next) {
  try {
    const id = req.params.id;

    Postings.update(
      {
        users_id: req.body.users_id,
        title: req.body.title,
        article: req.body.article,
        file_url: req.body.file_url,
      },
      {
        where: { id: id },
      },
    ).then((result) => {
      console.log("게시글 수정 완료");
      res.redirect("/postings");
    });
  } catch (error) {
    next(error);
  }
});

// Posting Delete
postingRouter.delete("/postings/:id", function (req, res, next) {
  const id = req.params.id;

  Postings.destroy({
    where: { id: id },
  })
    .then((result) => {
      res.redirect("/postings");
    })
    .catch((error) => {
      next(error);
    });
});

export default postingRouter;
