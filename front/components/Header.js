import React, { useContext, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

import Image from "next/image";
import styles from "../styles/Header.module.css";
import styled from "styled-components";
import Router from "next/router";
import { useUserState, useUserDispatch } from "../lib/userContext";
import * as Api from "../lib/api";

function Header() {
  const { user } = useUserState();
  const dispatch = useUserDispatch();
  const userState = useUserState();

  // 데이터 받아졌는지 확인용으로 추가했어요 필요하시면 주석 풀고 확인..!
  // useEffect(() => {
  //   console.log(userState);
  // }, [userState]);

  const onLogout = async (event) => {
    event.preventDefault();

    try {
      await Api.post("/logout");
      alert("로그아웃 되었습니다.");
      dispatch({
        type: "LOGOUT",
      });
      Router.push("/");
    } catch (error) {
      console.log("로그아웃에 실패하였습니다.");
    }
  };

  const Span = styled.span`
    display: inline-block;
    padding-bottom: 2px;
    background-image: linear-gradient(gray, gray);
    background-position: right -100% bottom 0;
    background-size: 200% 2px;
    background-repeat: no-repeat;
  `;

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
        {user ? (
          <Link href="/mypage/:id">
            <a>
              <span>MYPAGE</span>
            </a>
          </Link>
        ) : (
          <a>
            <Span>MYPAGE</Span>
          </a>
        )}
        {user ? (
          <a onClick={onLogout} style={{ cursor: "pointer" }}>
            <span>LOGOUT</span>
          </a>
        ) : (
          <a>
            <Span>LOGOUT</Span>
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
