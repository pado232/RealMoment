import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { setCookie, getCookie, removeCookie } from "./api/Cookies";
import axiosInstance from "./api/AxiosInstance";
import Login from "./Pages/Login";
import React, { useState, useEffect } from "react";

import Home from "./Pages/Home";
import MyHeader from "./Components/MyHeader";
import LoginHeader from "./Components/LoginHeader";
import SignUp from "./Pages/SignUp";
import MyPage from "./Pages/MyPage";
import MyFooter from "./Components/MyFooter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 쿠키에서 로그인 상태 확인
    const token = getCookie("Authorization");
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  // 로그인 함수
  const handleLogin = (AuthorizationToken, RefreshToken) => {
    setCookie("Authorization", AuthorizationToken);
    setCookie("Refresh_Token", RefreshToken);
    setIsLoggedIn(true); // 로그인 상태로 설정
  };

  // 로그아웃 함수
  const handleLogout = () => {
    axiosInstance
      .post(`/member/${getCookie("Id")}/logout`)
      .then((response) => {
        console.log("로그아웃 성공", response);
      })
      .catch((error) => {
        console.error("로그아웃 에러:", error);
      });

    // 로그아웃 상태로 설정
    removeCookie("Authorization"); // 쿠키에서 accessToken 제거
    removeCookie("Refresh_Token");
    removeCookie("Id");
    setIsLoggedIn(false);
  };

  const renderHeader = () => {
    if (location.pathname === "/login") {
      return <LoginHeader titleText={"로그인"} />;
    } else if (location.pathname === "/signup") {
      return <LoginHeader titleText={"회원가입"} />;
    } else {
      return <MyHeader isLoggedIn={isLoggedIn} onLogout={handleLogout} />;
    }
  };

  const renderFooter = () => {
    if (location.pathname === "/login") {
      return "";
    } else if (location.pathname === "/signup") {
      return "";
    } else {
      return <MyFooter />;
    }
  };

  return (
    <div className="App">
      {renderHeader()}
      {/* 로그인 상태 및 로그아웃 함수 전달 */}
      {/* {isLoggedIn && <Menu />} */}
      {/* 로그인되었을 때만 메뉴 표시 */}
      <Routes>
        {/* 각 메뉴 항목에 대한 라우트를 동적으로 생성합니다 */}

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      {renderFooter()}
    </div>
  );
}

export default App;
