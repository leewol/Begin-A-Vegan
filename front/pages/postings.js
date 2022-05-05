import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import GrassIcon from "@mui/icons-material/Grass";
import styled from "styled-components";

import * as Api from "../lib/api";
import PostCreator from "../components/PostCreator";
import PostCard from "../components/PostCard";

// TODO : 게시글 피드 형태로 보여 주기
// * 상태 : 작성 가능한지, 편집 중인지
// * 모든 게시글 데이터 받아오기 (등록 시간 최근 순)

const SlideBox = styled.div`
  overflow: hidden;
  width: 500px;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  transition: all 0.5s ease-in-out;
`;

export default function Posting() {
  const [isOpen, setIsOpen] = useState(false);

  const openPostingForm = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   // * 1개 불러오기
  //   Api.get("/postings", "0ac6a1fc-b752-4792-abaf-fb3ad34c").then((res) => {
  //     const { id, users_id, article, file_url, created_at } = res.data;
  //     console.log(res.data);
  //     console.log(id, users_id, article, file_url, created_at);
  //     console.log(res.data.Comments);
  //     console.log(res.data.User);
  //   });

  //   // * 여러개 불러오기
  //   Api.get("/postingList")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <Button variant="contained" size="small" onClick={openPostingForm}>
        <GrassIcon />
      </Button>
      <SlideBox isOpen={isOpen}>
        <PostCreator setIsOpen={setIsOpen} />
      </SlideBox>
      <PostCard />
    </>
  );
}
