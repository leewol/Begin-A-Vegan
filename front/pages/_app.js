// ? 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트
// 페이지에 적용할 공통 레이아웃의 역할
// 모든 컴포넌트에 공통으로 적용할 속성 관리

import "../styles/globals.css";
import "../styles/infoStyles.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
