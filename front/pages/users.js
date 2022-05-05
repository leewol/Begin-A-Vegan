import React, { useState } from "react";
import Header from "../components/Header";
import * as Api from "../lib/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onNicknameHandler = (event) => {
    setNickname(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await Api.post("/users", {
        email,
        nickname,
        password,
      });
    } catch (error) {
      console.log("회원가입에 실패하였습니다.", error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <span>
          당신은
          <br />
          비건인가요?
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={email}
            onChange={onEmailHandler}
          />
          {!isEmailValid && (
            <div>
              <span>이메일 형식이 올바르지 않습니다.</span>
            </div>
          )}
        </div>
        <div>
          <input
            name="nickname"
            placeholder="NICKNAME"
            value={nickname}
            onChange={onNicknameHandler}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            value={password}
            onChange={onPasswordHandler}
          />
          {!isPasswordValid && (
            <div>
              <span>비밀번호를 4글자 이상으로 입력해주세요.</span>
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="confirm-password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          {!isPasswordSame && (
            <div>
              <span>비밀번호와 일치하지 않습니다.</span>
            </div>
          )}
        </div>
        <button type="submit">CREATE ACCOUNT</button>
      </form>
    </div>
  );
}
