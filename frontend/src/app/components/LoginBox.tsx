"use client";

import React, { useState, useEffect } from "react";
import { LoginCloseProps } from "../types/common";
import { LoginType } from "../types/common";
import { LoginAuthProps } from "../types/common";
import { useAuth } from "./AuthContext";

const LoginBox = ({ onCloseLogin }: LoginCloseProps) => {
  // state
  const [loginEmail, setLoginEmail] = useState<LoginType["email"]>("");
  const [loginPass, setLoginPass] = useState<LoginType["password"]>("");
  const [backEndErrors, setBackEndErrors] = useState<{ [key: string]: string }>(
    {}
  );
  // AuthContextを使用
  const { setAuthState, setUser } = useAuth();

  // event handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(e.target.value);
  };
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPass(e.target.value);
  };

  // login submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginEmail, loginPass }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        setBackEndErrors(data.errors || {});
        return null;
      }
      if (data.success) {
        setAuthState(true);
        setUser(data.user);
        onCloseLogin();
      }
    } catch (error) {
      console.error("通信エラー:", error);
    }
  };

  return (
    <div className="login bg-blue-50 rounded-lg p-10 absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4">
      <div className="login_inner">
        <div className="login_title text-blue-500 mb-5 text-2xl text-center">
          <h2>Login</h2>
        </div>
        <div className="login_form">
          <form action="" method="post" onSubmit={handleSubmit}>
            {backEndErrors.login && (
              <p className="text-red-500 text-sm">{backEndErrors.login}</p>
            )}
            <dl>
              <dt>
                <label htmlFor="mail">Email:</label>
              </dt>
              <dd className="mb-5">
                <input
                  type="email"
                  name="mail"
                  value={loginEmail}
                  onChange={handleEmailChange}
                  className="border border-blue-300"
                />
                {backEndErrors.email && (
                  <p className="text-red-500 text-sm">{backEndErrors.email}</p>
                )}
              </dd>
              <dt>
                <label htmlFor="password">Password:</label>
              </dt>
              <dd className="mb-5">
                <input
                  type="password"
                  name="password"
                  value={loginPass}
                  onChange={handlePassChange}
                  className="border border-blue-300"
                />
                {backEndErrors.password && (
                  <p className="text-red-500 text-sm">
                    {backEndErrors.password}
                  </p>
                )}
              </dd>
            </dl>
            <div className="flex justify-center items-center gap-5">
              <button
                type="submit"
                className="bg-blue-500 text-slate-200 px-2 py-1 rounded"
              >
                Login
              </button>
              <button
                className="bg-zinc-400 text-slate-200 px-2 py-1 rounded"
                onClick={onCloseLogin}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
