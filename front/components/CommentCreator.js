// TODO: 댓글 작성
// * 해당 게시글 번호, 유저 id 받아오기, content 적은 대로 post

import { useState } from "react";

import { Button, Avatar } from "@mui/material";
import styled from "styled-components";

import * as Api from "../lib/api";

const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 20px 10px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
`;

const InputBox = styled.input`
  width: 320px;
  border: none;
  outline: none;
`;

// * userID 정보는 백엔드에서 처리됨
export default function CommentCreator({ profile, postingsId, setPostingList }) {
  const [content, setContent] = useState("");
  const [contentable, setContentable] = useState(true);

  const handleCommentChange = (event) => {
    const writtenTxt = event.target.value;
    setContent(writtenTxt);
    setContentable(!writtenTxt);
  };
  const handleCommentClick = async () => {
    try {
      Api.post(`/${postingsId}/comments/comment`, {
        content,
      });
    } catch (err) {
      console.error("댓글 등록에 실패하였습니다.", err);
    }
    setContent("");
  };

  return (
    <CommentBox>
      <TextBox>
        <Avatar
          alt="User"
          src={profile || "/img/defaultPic.png"}
          sx={{ width: 28, height: 28, marginRight: 2 }}
        />
        <InputBox
          type="text"
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={handleCommentChange}
        />
      </TextBox>
      <Button variant="text" onClick={handleCommentClick} disabled={contentable}>
        COMMENT
      </Button>
    </CommentBox>
  );
}
