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

function App() {
  const [showButton, setShowButton] = useState(false);
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

  const renderMenu = () => {
    if (location.pathname === "/login") {
      return "";
    } else if (location.pathname === "/signup") {
      return "";
    } else {
      return <Menu />;
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

  // 상단으로 스크롤하는 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      // 예시로 300 픽셀 이상 스크롤되면 버튼을 보여줍니다.
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderckeck" element={<OrderCheck />} />
            <Route path="/item/:categoryId" element={<Item />} />
            <Route path="/detail/:itemId" element={<Detail />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
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
