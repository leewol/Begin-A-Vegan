import cors from "cors";
import modelManager from "./db/models";
import { sysLog, sysErrorLog, DatabaseError } from "./src/utils/logger";
import mysqlManager from "./db";
import * as dotenv from "dotenv";
import swaggerDocument from "./src/swagger.json";
import express from "express";
import { swaggerUi, specs } from "./src/modules/swagger";
import userAuthRouter from "./src/routers/userRouter";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import passportConfig from "./passport";

dotenv.config();

passportConfig();

const swaggerDocument = require("./src/swagger.json");
const { swaggerUi, specs } = require("./src/modules/swagger");
const app = express();

const PORT = 5001;

mysqlManager.connect();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.PASSWORD,
  }),
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.send("Hello Express");
});

app.use(postingRouter);

app.use(userAuthRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
