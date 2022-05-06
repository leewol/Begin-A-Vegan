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
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  transition: all 0.5s ease-in-out;
`;

export default function Posting() {
  const [isOpen, setIsOpen] = useState(false);
  const [postingList, setPostingList] = useState([]);

  const openPostingForm = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // * 여러개 불러오기
    Api.get("/postingList")
      .then((res) => {
        setPostingList(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log(postingList);

  return (
    <>
      <Button variant="contained" size="small" onClick={openPostingForm}>
        <GrassIcon />
      </Button>
      <SlideBox isOpen={isOpen}>
        <PostCreator
          setIsOpen={setIsOpen}
          postingList={postingList}
          setPostingList={setPostingList}
        />
      </SlideBox>
      {postingList.map((posting) => (
        <PostCard key={posting.id} posting={posting} />
      ))}
    </>
  );
}
