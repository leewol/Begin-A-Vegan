import express from "express";
import mysqlManager from "../../db";
import Users from "../../db/models/user";
import bcrypt from "bcrypt";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn } from "./middlewares";

const userAuthRouter = express.Router();

// userAuthRouter.get('/', (req,res,next)=> {
//   try{
//     if(req.user){
//     const user = await Users.findOne({
//       where : {id : req.user.id}
//     });
//     res.status(200).json(user);
//   }else{
//     res.status(200).json(null);
//   }
//   }catch(error){
//     console.error(error);
//     next(error);
//   }})

userAuthRouter.post("/users", isNotLoggedIn, async (req, res) => {
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
    is_Vegan: req.body.is_vegan,
    profile_url: req.body.profile_url,
  };

  await Users.create(user)
    .then((result) => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
});

userAuthRouter.post("/login", isNotLoggedIn, (req, res, next) => {
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
      console.log("ok");
      return res.json(Users);
    });
  })(req, res, next);
});

userAuthRouter.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

export default userAuthRouter;
