import express from "express";
import mysqlManager from "../../db";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import bcrypt from "bcrypt";
import passport from "passport";
import multer from "multer";
import jwt from "jsonwebtoken";
import { login_required } from "../middlewares/login_required";
import dotenv from "dotenv";
import { cookie } from "express/lib/response";

const userAuthRouter = express.Router();

userAuthRouter.get("/users/:id", async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.send("없는 사용자입니다.");
    }
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/users", async (req, res) => {
  const duplicate = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (duplicate) {
    return res.status(403).send("중복된 이메일입니다");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const user = {
    email: req.body.email,
    password: hashedPassword,
    nickname: req.body.nickname,
    is_vegan: req.body.is_vegan,
    profile_url: req.body.profile_url,
    description: req.body.description,
  };

  await Users.create(user)
    .then((result) => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
});

userAuthRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, Users, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(Users, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const email = req.body.email;
      const password = req.body.password;
      const token = jwt.sign(
        {
          type: "JWT",
          email,
          password,
        },
        process.env.JWT_SECRET_KEY,
      );

      res.cookie("token", token);
      return res.json(Users);
    });
  })(req, res, next);
});

userAuthRouter.post("/logout", (req, res) => {
  req.logout();
  res.clearCookie("token");
  res.send("ok");
});

userAuthRouter.patch("/users/:id", async (req, res, next) => {
  try {
    const user = await Users.update(
      {
        nickname: req.body.nickname,
        description: req.body.description,
      },
      {
        where: { id: req.user.dataValues.id },
      },
    );
    res.status(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const upload = multer({
  // 저장 위치 diskStorage = 하드디스크
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads"); // 저장할 폴더 지정
    },
    filename(req, file, cb) {
      const ext = file.originalname.substring(file.originalname.lastIndexOf(".")); // 중복피하기위한 확장자 추출 ex(.png)
      cb(null, `${file.fieldname}-${Date.now()}${ext}`); //파일명 저장 이름 + 날짜 + 확장자
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 크기 지정
});

// 폼마다 형식이 다르기 떄문에 라우터마다 별도의 세팅 필요
// storage 옵션만 s3로 바꾸면 멀터가 알아서 스토리지로 올려줌
userAuthRouter.post("/profile", upload.single("image"), login_required, async (req, res) => {
  console.log(req.file);
  await req.user.update({ profile_url: req.file.path });
  res.json(req.file);
});
//upload array = 여러장 / single = 한장

userAuthRouter.get("/me", login_required, async (req, res) => {
  res.json(req.user);
});

userAuthRouter.put("/description", login_required, async (req, res) => {
  req.user = await req.user.update({ description: req.body.description });
  res.json(req.user);
});

userAuthRouter.get("/records/:id", async (req, res) => {
  try {
    const startDay = new Date(2022, 1, 1);
    const endDay = new Date(2022, 12, 1);

    const record = await Postings.findAll({
      raw: true,
      where: { users_id: req.params.id },
      attributes: ["created_at"],
    });
    for (const value of record) {
      console.log(value.created_at);
    }

    res.status(200).json(record);
  } catch (err) {
    console.log(err);
  }
});

export default userAuthRouter;
