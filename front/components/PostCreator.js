import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styled from "styled-components";
import Button from "@mui/material/Button";

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
  const [description, setDescription] = useState();
  const [postable, setPostable] = useState(false);

  // const validatePost = () => {
  //   if (description.length == 0)
  // }
  const handleQuillSubmit = () => {};

  const formats = ["bold", "italic", "underline", "strike", "image", "clean"];
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], ["image"], ["clean"]],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    handler: {
      image: imageHandler,
    },
  };

  return (
    <form onSubmit={handleQuillSubmit}>
      <QuillWrapper
        theme="snow"
        modules={modules}
        formats={formats}
        value={description}
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
