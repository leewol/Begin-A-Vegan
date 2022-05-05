import express from "express";
import mysqlManager from "../../db";
import { Sequelize, Op } from "sequelize";
import multer from "multer";
import path from "path";
import Comments from "../../db/models/comment";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import { login_required } from "../middlewares/login_required";

const postingRouter = express.Router();

// 프론트 참고: https://handhand.tistory.com/110
// 이미지 업로드를 위한 multer
const upload = multer({
  // 저장 위치 diskStorage = 하드디스크
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/images"); // 저장할 폴더 지정(express 실행 시 자동 생성되는 public/images 폴더에 저장)
    },
    filename(req, file, cb) {
      // 중복피하기위한 확장자 추출 ex(.png)
      const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
      //파일명 저장 이름 + 날짜 + 확장자 -> 중복된 사진 생성 방지
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 크기 지정(프론트랑 상의 필요)
});

// 게시글 생성
postingRouter.post("/postings/posting", async (req, res, next) => {
  try {
    const posting = {
      users_id: req.body.users_id,
      title: req.body.title,
      article: req.body.article,
      file_url: req.body.file_url, // 사진 file 경로 만들기
    };

    await Postings.create(posting);
    res.status(201).json(posting);
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
      where,
      limit: 10,
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
      ],
    });

    res.status(201).json(posting);
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

// 게시물 좋아요 -> 좋아요 누르면 postings에 부분 수정(patch)
postingRouter.patch("/:postings_id/like", async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
    if (!posting) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await posting.addLikers(req.users_id); //users_id 수정 필요
    res.json({ Postings_id: posting.id, Users_id: req.users_id });
  } catch (error) {
    next(error);
  }
});

// 게시물 좋아요 취소 -> 좋아요 취소하면 postings에서 likers 삭제
postingRouter.delete("/:postings_id/like", async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.posting_id } });
    if (!posting) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await posting.removeLikers(req.users_id);
    res.json({ Postings_id: posting.id, Users_id: req.users_id });
  } catch (error) {
    next(error);
  }
});

export default postingRouter;
