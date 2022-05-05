import express from "express";
import mysqlManager from "../../db";
import { Sequelize, Op } from "sequelize";
import multer from "multer";
import path from "path";
import Comments from "../../db/models/comment";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import Likes from "../../db/models/like_users_postings";
import { login_required } from "../middlewares/login_required";

const postingRouter = express.Router();

// // 이미지 업로드를 위한 multer
// const upload = multer({
//   // 저장 위치 diskStorage = 하드디스크
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, "public/images"); // 저장할 폴더 지정(express 실행 시 자동 생성되는 public/images 폴더에 저장)
//     },
//     filename(req, file, cb) {
//       // 중복피하기위한 확장자 추출 ex(.png)
//       const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
//       //파일명 저장 이름 + 날짜 + 확장자 -> 중복된 사진 생성 방지
//       cb(null, `${file.fieldname}-${Date.now()}${ext}`);
//     },
//   }),
//   limits: { fileSize: 20 * 1024 * 1024 }, // 크기 지정(프론트랑 상의 필요)
// });

// 게시글 생성
postingRouter.post("/postings/posting", login_required, async (req, res, next) => {
  try {
    const posting = {
      users_id: req.user.id,
      article: req.body.article,
      file_url: req.body.file_url, // 사진 file 경로 만들기
    };

    const newPosting = await Postings.create(posting);
    res.status(201).json(newPosting);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 등록된 모든 게시글 조회-> 최신 작성순
postingRouter.get("/postingList", login_required, async (req, res, next) => {
  try {
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
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "DESC"],
      ],
    });
    //   order: [
    //     ["created_at", "DESC"],
    //     [Comments, "created_at", "DESC"],
    //   ],
    //   include: [
    //     {
    //       model: Users,
    //       attributes: ["id", "nickname"],
    //     },
    //     {
    //       model: Users,
    //       as: "Likers",
    //       attributes: ["id"],
    //     },
    //   ],
    // });
    res.status(200).json(postings);
  } catch (error) {
    next(error);
  }
});

// 게시글 1개 조회
postingRouter.get("/postings/:id", login_required, async (req, res, next) => {
  try {
    const posting = await Postings.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          order: ["created_at", "DESC"],
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
        },
      ],
    });

    res.status(201).json(posting);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정(제목, 내용만 수정 가능) -> 수정완료하면 수정된 게시물 조회됨
postingRouter.put("/postings/:id", login_required, async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    await Postings.update({ article: req.body.article }, { where: { id: req.params.id } });
    const updatedPosting = await Postings.findOne({
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
      ],
    });
    res.status(200).json(updatedPosting);
  } catch (error) {
    next(error);
  }
});

// 게시글 삭제
postingRouter.delete("/postings/:id", login_required, async (req, res, next) => {
  try {
    Postings.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ id: req.params.id }); //id에 담아서 프론트에 넘겨줌
  } catch (error) {
    next(error);
  }
});

// 게시물 좋아요 -> 좋아요 누르면 좋아요 +1 / 이미 좋아요 누른 상태에서 한 번 더 좋아요 누르면 -1(좋아요 취소)
postingRouter.post("/postings/:postings_id/like", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;
    const postings_id = req.params.postings_id;

    const is_liked = await Likes.findAll({
      where: { users_id, postings_id },
    });
    if (!is_liked) {
      const liked = Likes.create({ users_id, postings_id });
      res.status(201).json(liked);
    } else {
      Likes.destroy({ where: { users_id, postings_id } });
      res.status(200).json(true);
    }
    // if (!is_liked) {
    //   const like = {
    //     users_id: req.user.id,
    //     postings_id: req.params.postings_id,
    //   };
    //   const liked = await Likes.create(like);
    //   res.status(201).json(liked);
    //     where: {
    //       users_id: req.user.id,
    //       postings_id: req.params.postings_id,
    //     },
    //   });
    //   if (!is_liked) {
    //     const like = {
    //       users_id: req.user.id,
    //       postings_id: req.params.postings_id,
    //     };
    //     const liked = await Likes.create(like);
    //     res.status(201).json(liked);
    //   } else {
    //     Likes.destroy(is_liked);
    //     res.status(200).json(false);
    //   }
  } catch (error) {
    next(error);
  }
});

export default postingRouter;
