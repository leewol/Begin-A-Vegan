import cors from "cors";
import modelManager from "./db/models";
import { sysLog, sysErrorLog, DatabaseError } from "./src/utils";
import mysqlManager from "./db";
import * as dotenv from "dotenv";
import express from "express";
import swaggerDocument from "./src/swagger.json";

const { swaggerUi, specs } = require("./src/modules/swagger");
const app = express();
const PORT = 5002;

dotenv.config();
console.log(process.env.DBUSERNAME);
mysqlManager.connect();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello Express");
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);

// swagger 확인용
app.post("/check", (req, res) => {
  console.log(req.body);
  res.json({ isStatus: 200 });
});

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
