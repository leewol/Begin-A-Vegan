import React, { useState, useCallback } from "react";
import Header from "../components/Header";

import * as Api from "../lib/api";

export default function Signup() {
  const [inputs, setInputs] = useState({
    id: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { id, email, password, confirmPassword, nickname } = inputs;

  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
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
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await Api.post("user/users", {
        id,
        nickname,
        email,
        password,
      });
    } catch (err) {
      return alert("회원가입에 실패하였습니다.", err);
    }

    if (password !== confirmPassword) {
      return alert("입력하신 비밀번호와 일치하지 않습니다.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Header />
      <div>
        <span>
          당신은
          <br />
          비건인가요?
        </span>
      </div>

      <div>
        <input name="id" placeholder="ID" onChange={onChange} value={id} />
      </div>
      <div>
        <input name="nickname" placeholder="NICKNAME" onChange={onChange} value={nickname} />
      </div>
      <div>
        <input name="email" placeholder="EMAIL" onChange={onChange} value={email} />
      </div>
      <div>
        <input name="password" placeholder="PASSWORD" onChange={onChange} value={password} />
      </div>
      <div>
        <input
          name="confirmPassword"
          placeholder="CONFIRM PASSWORD"
          onChange={onChange}
          value={confirmPassword}
        />
      </div>

      <div>
        <button disabled={!isFormValid}>CREATE ACCOUNT</button>
      </div>

      <style jsx>
        {`
          span {
            font-size: 25px;
          }

          input {
            margin-top: 7px;
          }
        `}
      </style>
    </form>
  );
}
