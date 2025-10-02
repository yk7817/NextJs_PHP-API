"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostSection from "./components/PostSection";
import RegisterBox from "./components/RegisterBox";
import LoginBox from "./components/LoginBox";
import PostListSection from "./components/PostListSection";
import { setRequestMeta } from "next/dist/server/request-meta";

const Home = () => {
  const [isRegisterShow, setIsRegisterShow] = useState<boolean>(false);
  const [isLoginShow, setIsLoginShow] = useState<boolean>(false);
  // const [authState, setAuthState] = useState<boolean>(false);

  return (
    <div className="wrap m-auto max-w-7xl w-full">
      <Header
        onOpenRegister={() => setIsRegisterShow(true)}
        onOpenLogin={() => setIsLoginShow(true)}
        onCloseRegister={() => setIsRegisterShow(false)}
        onCloseLogin={() => setIsLoginShow(false)}
      />
      <PostSection />
      {isRegisterShow ? (
        <RegisterBox onCloseRegister={() => setIsRegisterShow(false)} />
      ) : null}
      {isLoginShow ? (
        <LoginBox onCloseLogin={() => setIsLoginShow(false)} />
      ) : null}
      <PostListSection />
      <Footer />
    </div>
  );
};

export default Home;
