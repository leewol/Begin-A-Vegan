import Link from "next/link";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  return (
    <nav>
      <ul className={styles.category}>
        <li>
          <Link href="#about">
            <a>
              {/* 데이터 시각화 자료 */}
              <span>ABOUT</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/info">
            <a>
              {/* 비건 관련 정보 소개 페이지 */}
              <span>INFORMATION</span>
            </a>
          </Link>
        </li>
        {/* 아코디언 패턴 컬렉션으로 INFORMATION 밑에 숨어있다가 클릭하면 나타나게 하기 */}
        {/* <li>
          <Link href="/">
            <a>
              <span>VEGAN RECIPE</span>
            </a>
          </Link>
        </li> */}
        <li>
          <Link href="/postings">
            <a>
              <span>COMMUNITY</span>
            </a>
          </Link>
        </li>
      </ul>
      <style jsx>
        {`
          li {
            margin-bottom: 7px;
          }

          span {
            display: inline-block;
            padding-bottom: 2px;
            background-image: linear-gradient(white, white);
            background-position: right -100% bottom 0;
            background-size: 200% 2px;
            background-repeat: no-repeat;
          }

          span:hover {
            background-position: left -100% bottom 0;
            transition: background-position 0.9s;
          }
        `}
      </style>
    </nav>
  );
}
