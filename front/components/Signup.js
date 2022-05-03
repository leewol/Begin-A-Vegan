import React, { useState } from "react";
import styles from "../styles/Signup.module.css";

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

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert("입력하신 비밀번호와 일치하지 않습니다.");
    }
  };

  return (
    <form className={styles.signup}>
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
        <button type="submit" onSubmit={onSubmit}>
          CREATE ACCOUNT
        </button>
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
