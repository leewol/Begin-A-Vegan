import aws from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  credentials: new aws.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }),
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "portfolio-10team",
    key: (req, file, cb) => {
      // 중복피하기위한 확장자 추출 ex(.png)
      const ext = file.originalname.split(".").pop();
      cb(null, `images/${file.fieldname}-${Date.now()}${ext}`); //파일명 저장 이름 + 날짜 + 확장자
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 크기 지정
});

export default upload;
