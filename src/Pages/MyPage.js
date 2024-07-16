import { useState, useEffect } from "react";
import Review from "../Components/Review/Review";
import ReviewWrite from "../Components/Review/ReviewWrite";
import ReviewMine from "../Components/Review/ReviewMine";
import UserGrade from "../Components/UserGrade";
import OrderHistory from "../Components/Order/OrderHistory";
import Container from "../util/Container";
import Delivery from "../Components/Delivery/Delivery";
import Point from "../Components/Point/Point";
import Privacy from "../Components/Privacy/Privacy";
import axiosInstance from "../api/AxiosInstance";
import { getCookie } from "../api/Cookies";
import "../styles/MyPage.css";
import InquiryWrite from "../Components/Inquiry/InquiryWrite";
import MyInpuiry from "../Components/Inquiry/MyInquiry";
import QandA from "../Components/QandA/QandA";
import usePageTitle from "../hooks/usePageTitle";
import { useLocation } from "react-router-dom";
import Membership from "../Components/Membership/Membership";

const myPageMenu = [
  { bar_name: "주문내역", bar_value: "OrderHistory" },
  { bar_name: "배송지 관리", bar_value: "delivery" },
  { bar_name: "리뷰", bar_value: "review" },
  { bar_name: "멤버십", bar_value: "Membership" },
  { bar_name: "적립금", bar_value: "point" },
  { bar_name: "1:1 문의", bar_value: "inquiry" },
  { bar_name: "Q&A", bar_value: "QandA" },
  { bar_name: "개인정보", bar_value: "editInfo" },
];

const MyPage = () => {
  usePageTitle("마이페이지");

  const location = useLocation();
  const { listState: initialListState } = location.state || {};

  const [totalReview, setTotalReview] = useState(0);
  const [authError, setAuthError] = useState(false);
  const [listState, setListState] = useState(
    initialListState || sessionStorage.getItem("selectedMenu") || "OrderHistory"
  );

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [reviewCountUpdated, setReviewCountUpdated] = useState(false);

  const fetchMyPage = () => {
    if (getCookie("Id") === undefined) {
      setAuthError(true);
    } else {
      axiosInstance
        .get(`/member/${getCookie("Id")}`)
        .then((res) => {
          console.log("fetchMyPage GET ", res);
        })
        .catch((error) => {
          console.error("fetchMyPage GET Error:", error);
        });
    }
  };

  const MyReviewList = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/reviewList`)
      .then((res) => {
        const totalReviewdata = res.data.totalReview;
        setTotalReview(totalReviewdata);
        console.log("MyReviewList GET ", res);
      })
      .catch((error) => {
        console.error("MyReviewList GET Error:", error);
      });
  };

  useEffect(() => {
    MyReviewList();
  }, [reviewCountUpdated]);

  useEffect(() => {
    fetchMyPage();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("selectedMenu", listState);
  }, [listState]);

  const goToDelivery = () => {
    setListState("delivery");
  };

  const goToPrivacy = () => {
    setListState("editInfo");
  };

  const goToPoint = () => {
    setListState("point");
  };

  const goToMembership = () => {
    setListState("Membership");
  };

  const goToReview = () => {
    setListState("review");
  };

  if (authError) {
    return (
      <div>
        <Container>
          <div style={{ height: 410 }}>
            <center>
              <h2>ERROR</h2>
              <div>
                서버가 회원 정보를 받아들이지 못해 MyPage를 열람하실 수
                없습니다.
              </div>
              <div>
                로그인을 해주세요. <a href="/login">로그인 바로가기</a>
              </div>
            </center>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="MyPage">
      <Container>
        <div className="mypage_content">
          <div className="mypage_menu">
            <ul>
              {myPageMenu.map((it) => (
                <li
                  className={it.bar_value === listState ? "click" : ""}
                  key={it.bar_value}
                  {...it}
                  onClick={() => setListState(it.bar_value)}
                >
                  {it.bar_name}
                </li>
              ))}
            </ul>
          </div>
          <UserGrade
            goToPrivacy={goToPrivacy}
            goToPoint={goToPoint}
            goToReview={goToReview}
            goToMembership={goToMembership}
            totalReview={totalReview}
            profileUpdated={profileUpdated}
            reviewCountUpdated={reviewCountUpdated}
          />

          {listState === "OrderHistory" ? (
            <OrderHistory
              profileUpdated={profileUpdated}
              setProfileUpdated={setProfileUpdated}
              MyReviewList={MyReviewList}
              reviewCountUpdated={reviewCountUpdated}
              setReviewCountUpdated={setReviewCountUpdated}
            />
          ) : listState === "delivery" ? (
            <Delivery />
          ) : listState === "review" ? (
            <Review
              h2Text={"리뷰"}
              barText1={"리뷰 작성"}
              barText2={"나의 리뷰"}
              WriteComponent={ReviewWrite}
              MyComponent={ReviewMine}
              MyReviewList={MyReviewList}
              reviewCountUpdated={reviewCountUpdated}
              setReviewCountUpdated={setReviewCountUpdated}
            />
          ) : listState === "Membership" ? (
            <Membership />
          ) : listState === "point" ? (
            <Point />
          ) : listState === "inquiry" ? (
            <Review
              h2Text={"1:1 문의"}
              barText1={"문의하기"}
              barText2={"나의 문의"}
              WriteComponent={InquiryWrite}
              MyComponent={MyInpuiry}
            />
          ) : listState === "QandA" ? (
            <QandA />
          ) : listState === "editInfo" ? (
            <Privacy goToDelivery={goToDelivery} />
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
};

export default MyPage;
