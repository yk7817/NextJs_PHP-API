"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterType } from "../types/common";
import { RegisterCloseProps } from "../types/common";

const RegisterBox = ({ onCloseRegister }: RegisterCloseProps) => {
  // useForm settings
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({ mode: "onBlur" });

  // form state
  const [registerForm, setRegisterForm] = useState<RegisterType>({
    name: "",
    email: "",
    password: "",
  });
  // backendmessages state
  const [backendErrors, setBackendErrors] = useState<{ [key: string]: string }>(
    {}
  );
  // input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submit後、register.phpへリクエスト
  const onSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      // php側のエラーを取得する為、リクエストしたデータを受け取る
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data.errors);
        // バックエンドのエラーをstateに代入
        setBackendErrors(data.errors || {});
        return null;
      }
      onCloseRegister();
    } catch (error) {
      console.error("通信エラー:", error);
    }
  };

  return (
    <div className="register bg-blue-50 rounded-lg p-10 absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4">
      <div className="register_inner">
        <div className="register_title text-blue-500 mb-5 text-2xl text-center">
          <h2>Register</h2>
        </div>
        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <dl>
            <dt>
              <label htmlFor="name">Name:</label>
            </dt>
            <dd className="mb-5">
              <input
                {...register("name", { required: "Name is Required" })}
                type="text"
                value={registerForm.name}
                onChange={handleChange}
                className="border border-blue-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              {backendErrors.name && <p>{backendErrors.name}</p>}
              {backendErrors.dup_name && (
                <p className="text-red-500 text-sm">{backendErrors.dup_name}</p>
              )}
            </dd>
            <dt>
              <label htmlFor="email">Email:</label>
            </dt>
            <dd className="mb-5">
              <input
                {...register("email", { required: "Email is Required" })}
                type="text"
                value={registerForm.email}
                onChange={handleChange}
                className="border border-blue-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {backendErrors.email && (
                <p className="text-red-500 text-sm">{backendErrors.email}</p>
              )}
              {backendErrors.dup_email && (
                <p className="text-red-500 text-sm">
                  {backendErrors.dup_email}
                </p>
              )}
            </dd>
            <dt>
              <label htmlFor="password">Password</label>
            </dt>
            <dd className="mb-5">
              <input
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 7,
                    message: "Please set a password with at least 7 characters",
                  },
                })}
                type="password"
                value={registerForm.password}
                onChange={handleChange}
                className="border border-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {backendErrors.password ?? <p>{backendErrors.password}</p>}
            </dd>
          </dl>
          <div className="flex justify-center items-center gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-slate-200 px-2 py-1 rounded"
            >
              Register
            </button>
            <button
              className="bg-zinc-400 text-slate-200 px-2 py-1 rounded"
              onClick={onCloseRegister}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterBox;
