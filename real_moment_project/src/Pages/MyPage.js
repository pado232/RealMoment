import { useState, useEffect } from "react";

import Review from "../Components/Review/Review";
import ReviewWrite from "../Components/Review/ReviewWrite";
import ReviewMine from "../Components/Review/ReviewMine";
import UserGrade from "../Components/UserGrade";
import OrderHistory from "../Components/Order/OrderHistory";
import Container from "../util/Container";

import "../styles/MyPage.css";
import Delivery from "../Components/Delivery/Delivery";
import Point from "../Components/Point/Point";
import Privacy from "../Components/Privacy/Privacy";

const myPageMenu = [
  { bar_name: "주문내역", bar_value: "OrderHistory" },
  { bar_name: "배송지 관리", bar_value: "delivery" },
  { bar_name: "리뷰", bar_value: "review" },
  { bar_name: "적립금", bar_value: "point" },
  { bar_name: "1:1 문의", bar_value: "inquiry" },
  { bar_name: "개인정보수정", bar_value: "editInfo" },
];

const MyPage = () => {
  const [listState, setListState] = useState(
    sessionStorage.getItem("selectedMenu") || "OrderHistory"
  );

  useEffect(() => {
    sessionStorage.setItem("selectedMenu", listState);
  }, [listState]);

  const goToDelivery = () => {
    setListState("delivery");
  };

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
          <UserGrade />

          {listState === "OrderHistory" ? (
            <OrderHistory />
          ) : listState === "delivery" ? (
            <Delivery />
          ) : listState === "review" ? (
            <Review
              h2Text={"리뷰"}
              barText1={"리뷰 작성"}
              barText2={"나의 리뷰"}
              WriteComponent={ReviewWrite}
              MyComponent={ReviewMine}
            />
          ) : listState === "point" ? (
            <Point />
          ) : listState === "inquiry" ? (
            //   <Review
            //     h2Text={"1:1 문의"}
            //     barText1={"문의하기"}
            //     barText2={"나의 문의"}
            //     WriteComponent={Inquriy}
            //     MyComponent={ReviewMine}
            //   />
            ""
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
