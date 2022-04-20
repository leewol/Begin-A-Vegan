import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("성공입니다.");
});
