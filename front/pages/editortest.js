import dynamic from "next/dynamic";

const QuillWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function editortest() {
  return <QuillWrapper theme="snow" />;
}
