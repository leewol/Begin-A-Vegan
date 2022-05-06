import express from "express";
import mysqlManager from "../../db";
import { Sequelize, Op } from "sequelize";
import Comments from "../../db/models/comment";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import { login_required } from "../middlewares/login_required";

const postingRouter = express.Router();

// 게시글 생성
postingRouter.post("/postings/posting", async (req, res, next) => {
  try {
    const posting = {
      users_id: req.body.users_id,
      title: req.body.title,
      article: req.body.article,
      file_url: req.body.file_url,
    };

    const newPosting = await Postings.create(posting);
    res.status(200).json(newPosting);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 등록된 모든 게시글(피드) 로딩마다 10개씩 보여주기 -> 최신 작성순
postingRouter.get("/postingList", async (req, res, next) => {
  try {
    const where = {};
    if (req.query.lastId) {
      where.id = { [Op.lt]: req.query.lastId };
    }
    const postings = await Postings.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "DESC"],
      ],
      include: [
        {
          model: Users,
          attributes: ["id", "nickname"],
        },
        {
          model: Users,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(postings);
  } catch (error) {
    next(error);
  }
});

postingRouter.get("/postings/me", login_required, async (req, res) => {
  const postings = await Postings.findAll({
    where: {
      users_id: req.user.id,
      ...(req.query.lastId ? { id: { [Op.lt]: req.query.lastId } } : {}),
    },
    order: [["created_at", "DESC"]],
    offset: Number(req.query.offset) || 0,
    limit: 10,
  });
  res.json(postings);
});

// 게시글 1개 조회
postingRouter.get("/postings/:id", async (req, res, next) => {
  try {
    const posting = await Postings.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["id", "nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["id", "nickname", "profile_url"],
              order: ["created_at", "DESC"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "DESC"],
      ],
    });

    res.status(200).json(posting);
  } catch (error) {
    next(error);
  }
});

// "마이페이지" User가 좋아요 누른 게시물만 조회하기
postingRouter.get("/postings/:users_id/like_postings", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;
    const like_posting = await Likes.findAll({
      where: { users_id },
      include: [
        {
          model: Postings,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
            {
              model: Comments,
              include: [
                {
                  model: Users,
                  attributes: ["nickname", "profile_url"],
                },
              ],
            },
            {
              model: Likes,
              attributes: ["users_id"],
            },
          ],
          order: [
            ["created_at", "DESC"],
            [Comments, "created_at", "DESC"],
          ],
        },
      ],
    });
    res.status(200).json(like_posting);
  } catch (error) {
    next(error);
  }
});

// "마이페이지" User가 작성한 게시물만 조회하기
postingRouter.get("/postings/:users_id/postings", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;

    const postings = await Postings.findAll({
      where: { users_id },
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "DESC"],
      ],
    });
    res.status(200).json(postings);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정(제목, 내용만 수정 가능) -> 수정완료하면 수정된 게시물 조회됨
postingRouter.put("/postings/:id", async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    await Postings.update(
      { title: req.body.title, article: req.body.article },
      { where: { id: req.params.postings_id } },
    );
    const updatedPosting = await Postings.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "DESC"],
      ],
    });
    res.status(200).json(updatedPosting);
  } catch (error) {
    next(error);
  }
});

// 게시글 삭제
postingRouter.delete("/postings/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    // 게시글에 달린 댓글이 있다면 댓글 먼저 삭제
    const comments = Comments.findAll({ where: id });
    if (comments.length > 0) {
      await Comment.destroy({ where: id });
    }
    // 댓글 삭제 후 게시글 삭제
    await Postings.destroy({
      where: { id, users_id: req.body.id },
    });
    res.status(200).json({ id }); //id에 담아서 프론트에 넘겨줌
  } catch (error) {
    next(error);
  }
});

// 게시물 좋아요
postingRouter.post("/postings/:postings_id/like", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;
    const postings_id = req.params.postings_id;

    // const posting = await Postings.findOne({ where: { postings_id } });
    // if (!posting) {
    //   return res.status(403).send("존재하지 않는 게시글입니다.");
    // }
    const liked = await Likes.create({ users_id, postings_id });

    res.status(200).json(liked);
  } catch (error) {
    next(error);
  }
});

// 게시물 좋아요 취소
postingRouter.delete("/postings/:postings_id/like", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;
    const postings_id = req.params.postings_id;

    // const posting = await Postings.findOne({ where: { postings_id } });
    // if (!posting) {
    //   return res.status(403).send("존재하지 않는 게시글입니다.");
    // }
    Likes.destroy({ where: { users_id, postings_id } });
    res.status(200).json({ postings_id });
  } catch (error) {
    next(error);
  }
});

export default postingRouter;
