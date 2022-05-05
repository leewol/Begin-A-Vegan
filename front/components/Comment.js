import { useState } from "react";

import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
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

// TODO: 댓글 작성
// * 해당 게시글 번호, 유저 id 받아오기, content 적은 대로 post

export default function Comment() {
  const [content, setContent] = useState("");
  const [contentable, setContentable] = useState(true);

  const loginUserId = "a4b4baea-b4ed-424a-b7f7-96725b59"; // 임시 유저
  const postingsId = "4502cc76-ad91-4555-8d5b-fb8592a677a0"; // 임시 게시글 id

  const handleCommentChange = (event) => {
    const writtenTxt = event.target.value;
    setContent(writtenTxt);
    setContentable(!writtenTxt);
  };
  const handleCommentClick = async () => {
    try {
      await Api.post(`/${postingsId}/comments/comment`, {
        users_id: loginUserId,
        postings_id: postingsId,
        content,
      });
    } catch (err) {
      console.error("댓글 등록에 실패하였습니다.", err);
    }
    setContent("");
  };

  return (
    <CommentBox>
      {/* 여기에 댓글 유저 프로필 사진 */}
      <TextBox>
        <AccountCircle sx={{ color: "action.active", mr: 1 }} />
        <input type="text" value={content} onChange={handleCommentChange} />
      </TextBox>
      <Button variant="text" onClick={handleCommentClick} disabled={contentable}>
        COMMENT
      </Button>
    </CommentBox>
  );
}
