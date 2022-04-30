import express from "express";
import Postings from "../../db/models/posting";
import mysqlManager from "../../db";
import Sequelize from "sequelize";
import multer from "multer";
import path from "path";
import Users from "../../db/models/user";
import Comments from "../../db/models/comments";

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
      // eslint-disable-next-line max-len
      const ext = file.originalname.substring(file.originalname.lastIndexOf(".")); // 중복피하기위한 확장자 추출 ex(.png)
      // eslint-disable-next-line max-len
      cb(null, `${file.fieldname}-${Date.now()}${ext}`); //파일명 저장 이름 + 날짜 + 확장자 -> 중복된 사진 생성 방지
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 크기 지정(프론트랑 상의 필요)
});

// 게시글 생성
postingRouter.post("/postings/posting", upload.single("file_url"), async (req, res, next) => {
  try {
    const posting = {
      users_id: req.body.users_id,
      title: req.body.title,
      article: req.body.article,
      file_url: `/file_url/${req.file.filename}`, // 사진 file 경로 만들기
    };

    await Postings.create(posting);
    res.status(201).json(posting);
  } catch (error) {
    console.log(error);
  }
});

// 등록된 모든 게시글(피드) 보여주기 -> 최신 작성순
postingRouter.get("/postingList", async (req, res, next) => {
  try {
    Postings.findAll({ limit: 3, offset: 3, order: ["updatedAt", "DESC"] });
  } catch (err) {
    next(err);
  }
});

// 게시글 1개 조회
postingRouter.get("/postings/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const posting = await Postings.findOne({
      where: { id },
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
    const id = req.params.id;

    await Postings.update({ title: req.body.title, article: req.body.article }, { where: { id } });
    const updatedPosting = await Postings.findOne({
      where: { id },
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

export default postingRouter;
