import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

import CommentCreator from "./CommentCreator";
import PostingComments from "./PostingComments";

// TODO : 피드 레이아웃 완성
// * 유저 데이터 받아오기
// * 사진, 내용, 좋아요, 댓글, 댓글 달기

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({ posting }) {
  const postingsId = posting.id;
  const { users_id, User, article, file_url, Comments, is_deleted } = posting;

  // 게시글 본문 문단별로 분리
  const articleArr = article.split("<").map((el) => el.replace("p>", "").replace("/p>", ""));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500, marginBottom: 5 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="User"
            src={User.profile_url || "/img/defaultPic.png"}
            sx={{ width: 36, height: 36 }}
          />
        }
        action={
          <IconButton aria-label="like">
            {/* 조건 - 좋아요 유저 목록에 있는 id 중에 현재 로그인된 유저 id가 있는가 */}
            <FavoriteBorderIcon />
          </IconButton>
        }
        title={User.nickname}
        titleTypographyProps={{ fontWeight: 600 }}
      />

      <CardMedia
        component="img"
        sx={{ maxHeight: 600 }}
        image={file_url.includes("https://") ? file_url : "/img/defaultPic.png"}
        alt="user-image"
      />

      <CardContent>
        <Typography variant="body1" color="text" gutterBottom>
          불러온좋아요개수표시
        </Typography>
        <Typography variant="body2" color="text">
          <b>{User.nickname}</b>{" "}
          {articleArr.map((arti) => {
            if (!arti.includes("img src=") && arti !== "/") {
              // uuid key 사용
              const artiKey = uuidv4();
              return (
                <span key={artiKey}>
                  {arti
                    .replace("&amp;", "&")
                    .replace("&gt;", ">")
                    .replace("&lt;", "<")
                    .replace("&quot;", '"')}{" "}
                </span>
              );
            }
          })}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          // expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <InsertCommentIcon /> : <CommentOutlinedIcon />}
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* 수정 및 삭제 넣기 */}
        <CardContent>
          <PostingComments Comments={Comments} />
        </CardContent>
      </Collapse>
      <CommentCreator profile={User.profile_url} postingsId={postingsId} />
    </Card>
  );
}
