import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      {/* 왼쪽 상단 로고 */}
      <div className={styles.logo}>
        <Link href="/">
          <a style={{ marginLeft: "0px" }}>
            <Image src="/logo.png" alt="logo" width={200} height={150} />
          </a>
        </Link>
      </div>
      {/* 오른쪽 상단 수평 네비게이션 바 */}
      <div className={styles.menu}>
        <Link href="/login">
          <a>
            <span>LOGIN</span>
          </a>
        </Link>
        <Link href="/users">
          <a>
            <span>SIGNUP</span>
          </a>
        </Link>
        <Link href="/mypage/:id">
          <a>
            <span>MYPAGE</span>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          a {
            margin: 20px;
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
    </div>
  );
}

export default Header;
