import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import Router from "next/router";
import { AppContext } from "../pages/_app";

function Header() {
  const store = useContext(AppContext);

  const logout = (event) => {
    store.setLogin(false);
    store.setUser(false);
    Router.push("/");
  };

  return (
    <div className={styles.header}>
      {/* 왼쪽 상단 로고 */}
      <div className={styles.logo}>
        <Link href="/">
          <a style={{ marginLeft: "5px" }}>
            <Image src="/logo.png" alt="logo" width={200} height={200} />
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
        {login && (
          <a onClick={logout} style={{ cursor: "pointer" }}>
            <span>LOGOUT</span>
          </a>
        )}
      </div>
      <style jsx>
        {`
          a {
            margin: 20px;
          }
          span {
            display: inline-block;
            padding-bottom: 2px;
            background-image: linear-gradient(#06ff00, #06ff00);
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
