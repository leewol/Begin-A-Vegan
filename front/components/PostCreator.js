import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styled from "styled-components";
import Button from "@mui/material/Button";

import * as Api from "../lib/api";

/* 
  * document 조작의 순서 : 
  * [document 정의 -> react-quill 로드 -> react-quill이 document 조작] (Dynamic Import 이용)
    [react-quill 로드 -> react-quill이 document 조작 -> document 정의] (일반 Import)
    => document is not defined 오류
*/

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function PostCreator() {
  // * userID 정보는 메인 페이지에서 받아오기
  const LoginUserId = ""; // 임시 코드
  const [imageInfo, setImageInfo] = useState({
    imageId: null,
    fileObj: null,
  });
  const [postingInfo, setPostingInfo] = useState({
    users_id: LoginUserId,
    article: "",
    file_url: "",
  });
  const [postable, setPostable] = useState(false);

  // const validatePost = () => {
  //   if (description.length == 0)
  // }
  const handleQuillSubmit = () => {};

  // 이미지 처리하기 위한 핸들러
  const imageHandler = () => {
    // 1. 이미지를 저장할 input type-file DOM을 만든다
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accpet", "image/*");
    // 에디터 이미지 버튼을 클릭하면 해당 input이 클릭되고 파일 선택창 나옴
    input.click();

    // 이미지 선택 시
    input.addEventListener("change", async () => {
      console.log("onChange : 이미지 첨부");

      const file = input.files[0];
      console.log(file);
    });
  };

  const formats = ["bold", "italic", "underline", "strike", "image", "clean"];
  const modules = {
    toolbar: {
      handlers: {
        image: imageHandler,
      },
      container: [["bold", "italic", "underline", "strike"], ["image"], ["clean"]],
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return (
    <form onSubmit={handleQuillSubmit}>
      <QuillWrapper
        theme="snow"
        modules={modules}
        formats={formats}
        value={postingInfo.article}
        onChange={(value, delta, source, editor) =>
          console.log(editor.getLength(), editor.getText())
        }
        placeholder={"포스팅 내용을 입력하세요"}
      />
      {/* 사진 & 글 내용 없으면 disabled */}
      <Button type="submit" variant="contained" size="small">
        공유하기
      </Button>
    </form>
  );
}
