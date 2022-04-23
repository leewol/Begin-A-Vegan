import cors from "cors";
import express from "express";
import connection from "../db/mysql";

const app = express();
const port = connection.port || 3306;

// CORS 에러 방지
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection.connect();

app.listen(port, () => {

	console.log(`정상적으로 서버를 시작하였습니다.http://localhost:${port}`);
});

// 기본 페이지
app.get("/", (req, res) => {

	res.send("서버 연결 성공입니다");
    
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)


// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
// app.use(errorMiddleware);

export { app };


