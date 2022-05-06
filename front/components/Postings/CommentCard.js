import styled from "styled-components";
import { Avatar } from "@mui/material";

const TextBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    font-size: 14px;
    margin-right: 7px;
  }
`;

export default function CommentCard({ commentInfo }) {
  const { postings_id, users_id, User, content, is_deleted } = commentInfo;

  return (
    <TextBox>
      <Avatar
        alt="User"
        src={User.profile_url || "/img/defaultPic.png"}
        sx={{ width: 24, height: 24, marginRight: 1 }}
      />
      <span>
        <b>{User.nickname}</b>
      </span>
      <span>{content}</span>
    </TextBox>
  );
}
