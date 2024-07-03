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
import { CategoryProvider } from "./Components/Menu/CategoryProvider";
import Menu from "./Components/Menu/Menu";
import Item from "./Pages/Item";
import { SearchProvider } from "./Components/Item/SearchProvider";
import Detail from "./Pages/Detail";
import Cart from "./Pages/Cart";
import OrderCheck from "./Pages/OrderCheck";
import Heart from "./Pages/Heart";
import OrderCheckInfo from "./Pages/OrderCheckInfo";
import New from "./Pages/New";
import Sale from "./Pages/Sale";
import PrivateRoute from "./api/PrivateRoute"; // PrivateRoute 컴포넌트 임포트

function App() {
  const [showButton, setShowButton] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // production에서만 사용할 수 없도록
  if (process.env.NODE_ENV === "production") {
    console = window.console || {};
    console.log = function no_console() {}; // console log 막기
    console.warn = function no_console() {}; // console warning 막기
    console.error = function () {}; // console error 막기
  }
  //moontomato.tistory.com/30 [Moong:티스토리]
  출처: https: useEffect(() => {
    // 쿠키에서 로그인 상태 확인
    const token = getCookie("MemberAccess");
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  // 로그인 함수
  const handleLogin = (AccessToken, RefreshToken) => {
    setCookie("MemberAccess", AccessToken);
    setCookie("MemberRefresh", RefreshToken);
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
    removeCookie("MemberAccess"); // 쿠키에서 accessToken 제거
    removeCookie("MemberRefresh");
    removeCookie("Id");
    setIsLoggedIn(false);
    window.location.href = "/"; // 로그아웃 후 홈 페이지로 리디렉션
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

  const renderMenu = () => {
    if (location.pathname === "/login") {
      return null;
    } else if (location.pathname === "/signup") {
      return null;
    } else {
      return <Menu />;
    }
  };

  const renderFooter = () => {
    if (location.pathname === "/login") {
      return null;
    } else if (location.pathname === "/signup") {
      return null;
    } else {
      return <MyFooter />;
    }
  };

  // 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      // 예시로 100 픽셀 이상 스크롤되면 버튼을 보여줍니다.
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // 페이지 로드 시 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <CategoryProvider>
      <SearchProvider>
        <div className="App">
          {renderHeader()}
          {renderMenu()}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={<PrivateRoute element={Cart} isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/ordercheck"
              element={
                <PrivateRoute element={OrderCheck} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/ordercheckinfo"
              element={
                <PrivateRoute
                  element={OrderCheckInfo}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/heart"
              element={<PrivateRoute element={Heart} isLoggedIn={isLoggedIn} />}
            />
            <Route path="/item/:categoryId" element={<Item />} />
            <Route path="/detail/:itemId" element={<Detail />} />
            <Route path="/new" element={<New />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/mypage"
              element={
                <PrivateRoute element={MyPage} isLoggedIn={isLoggedIn} />
              }
            />
          </Routes>
          {showButton && (
            <button className="button-top" onClick={scrollToTop}>
              TOP
            </button>
          )}
          {renderFooter()}
        </div>
      </SearchProvider>
    </CategoryProvider>
  );
}

export default App;
