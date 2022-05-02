import dynamic from "next/dynamic";

/* 
  * document 조작의 순서 : 
  * [document 정의 -> react-quill 로드 -> react-quill이 document 조작] (Dynamic Import 이용)
    [react-quill 로드 -> react-quill이 document 조작 -> document 정의] (일반 Import)
    => document is not defined 오류
*/

const QuillWrapper = dynamic(
  () =>
    import("react-quill").then((mod) => {
      // 이 설정 안 해주면 선택 바가 두 개 보임 (React18의 문제인 듯)
      // ? 부모인 ReactQuill을 상속받은 QuillWrapper 클래스에서 내부적으로 뭔가 수정?
      class QuillWrapper extends mod.default {
        destroyEditor() {
          if (!this.editor) return;
          this.unhookEditor(this.editor);
        }
      }
      return QuillWrapper;
    }),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

export default function PostCreator() {
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], ["image"], ["clean"]],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return <QuillWrapper theme="snow" modules={modules} placeholder={"포스팅 내용을 입력하세요"} />;
}
