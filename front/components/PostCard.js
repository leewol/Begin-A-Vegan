import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
} from "@mui/material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// TODO : 피드 레이아웃 완성
// * 유저 데이터 받아오기
// * 사진, 내용, 좋아요, 댓글, 댓글 달기

export default function PostCard() {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={<Avatar alt="User" src="/img/defaultPic.png" sx={{ width: 36, height: 36 }} />}
        action={
          <IconButton aria-label="like">
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
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
