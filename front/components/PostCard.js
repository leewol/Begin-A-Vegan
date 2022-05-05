import { useState } from "react";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Collapse,
  Box,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Comment from "./Comment";

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

export default function PostCard() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={<Avatar alt="User" src="/img/defaultPic.png" sx={{ width: 36, height: 36 }} />}
        action={
          <IconButton aria-label="like">
            {/* 이거 checkbox로 바꾸기 */}
            <FavoriteIcon />
          </IconButton>
        }
        title="불러온닉네임"
        titleTypographyProps={{ fontWeight: 600 }}
      />
      <CardMedia
        component="img"
        sx={{ maxHeight: 600 }}
        image="/img/defaultPic.png"
        alt="user-image"
      />
      <CardContent>
        <Typography variant="body1" color="text" gutterBottom>
          불러온좋아요개수표시
        </Typography>
        <Typography variant="body2" color="text">
          <b>불러온닉네임</b> 불러온본문 This impressive paella is a perfect party dish and a fun
          meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>불러온 댓글들</CardContent>
      </Collapse>
      <Box sx={{ display: "flex", alignItems: "flex-end", marginLeft: 2, marginBottom: 3 }}>
        {/* 여기에 댓글 유저 프로필 사진 */}
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField id="input-comment" variant="standard" placeholder="Write a Comment" />
      </Box>
    </Card>
  );
}
