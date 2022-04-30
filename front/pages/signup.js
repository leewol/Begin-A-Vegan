import React, { useState } from "react";
import "../styles/Signup.module.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("입력하신 비밀번호와 일치하지 않습니다.");
    }
  };

  return (
    <div className="signup">
      <form>
        <div>
          <input
            name="name"
            type="text"
            placeholder="이름"
            value={name}
            onChange={onNameHandler}
            className="signup__input"
          />
        </div>
        <div>
          <input
            name="nickname"
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={onNicknameHandler}
            className="signup__input"
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={onEmailHandler}
            className="signup__input"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
            className="signup__input"
          />
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            className="signup__input"
          />
        </div>
        <div>
          <button type="submit" onSubmit={onSubmit} className="signup__button">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
