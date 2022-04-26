import cors from "cors";
import modelManager from "./db/models";
import { sysLog, sysErrorLog, DatabaseError } from "./src/utils";
import mysqlManager from "./db";
import * as dotenv from "dotenv";
import express from "express";
<<<<<<< Updated upstream
import swaggerDocument from "./src/swagger.json";

=======
import postingRouter from "./src/routers/postingRouter";

dotenv.config();

const swaggerDocument = require("./src/swagger.json");
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
=======
app.use(postingRouter);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true }),
);
>>>>>>> Stashed changes

// swagger 확인용
app.post("/check", (req, res) => {
  console.log(req.body);
  res.json({ isStatus: 200 });
});

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
