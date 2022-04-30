import express from "express";
import Postings from "../../db/models/posting";
import mysqlManager from "../../db";
import Sequelize from "sequelize";
import multer from "multer";
import path from "path";

const postingRouter = express.Router();

// 이미지 업로드를 위한 multer
const upload = multer({
  // 저장 위치 diskStorage = 하드디스크
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/images"); // 저장할 폴더 지정(express 실행 시 자동 생성되는 public/images 폴더에 저장)
    },
    filename(req, file, cb) {
      const ext = file.originalname.substring(file.originalname.lastIndexOf(".")); // 중복피하기위한 확장자 추출 ex(.png)
      cb(null, file.fieldname + "-" + Date.now() + ext); //파일명 저장 이름 + 날짜 + 확장자 -> 중복된 사진 생성 방지
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 크기 지정
});

// 게시글 생성
postingRouter.post("/postings/posting", login_required, async (req, res, next) => {
  try {
    const posting = {
      users_id: req.body.users_id,
      title: req.body.title,
      article: req.body.article,
      file_url: req.body.file_url,
    };

    const result = await Postings.create(posting);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// 등록된 모든 게시글(피드) 보여주기 -> 최신 작성순
postingRouter.get("/postingList", async function (req, res, next) {
  Postings.findAll({ limit: 3, offset: 3 }, { order: '"updatedAt" DESC' });
});

// 게시글 1개 조회
postingRouter.get("/postings/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    Postings.findOne({
      where: { id: id },
      include: { model: Comment },
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
