import React, { useState, useContext, createContext } from "react";
import Header from "../components/Header";

import * as Api from "../lib/api";

export default function Login() {
  const DispatchContext = createContext(null);

  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await Api.post("/login", {
        email,
        password,
      });
      const user = res.data;
    } catch (error) {
      console.log("로그인에 실패하였습니다!\n", error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            value={email}
            onChange={onEmailHandler}
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
        </div>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
}
