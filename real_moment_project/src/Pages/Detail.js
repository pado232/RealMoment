import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdPayment } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";

import Container from "../util/Container";
import ImgSlide from "../util/ImgSlide";
import DetailImg from "../Components/Detail/DetailImg";
import DetailReview from "../Components/Detail/DetailReview";
import DetailQandA from "../Components/Detail/DetailQandA";
import ModalContainer from "../util/ModalContainer";

import "../styles/Detail.css";
import axiosInstance from "../api/AxiosInstance";
import { getCookie } from "../api/Cookies";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";
import DetailQuestionMark from "../Components/Detail/DetailQuestionMark";
const Detail = () => {
  const { itemId } = useParams();

  const navigate = useNavigate();

  const detailRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [heart, setHeart] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [itemCount, setItemCount] = useState(1);
  const [itemDetails, setItemDetails] = useState(null); // 초기값을 null로 설정

  const [modalOpen, setModalOpen] = useState(false);

  const customStyles = {
    content: {
      top: "55%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      height: "400px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  };

  const fetchItemDetail = () => {
    axiosInstanceWithoutAuth
      .get(`/item?itemId=${itemId}`)
      .then((res) => {
        const itemDetailsData = res.data;
        setItemDetails(itemDetailsData);
        console.log("fetchItemDetail GET ", res);
      })
      .catch((error) => {
        console.error("fetchItemDetail GET Error:", error);
      });
  };

  useEffect(() => {
    fetchItemDetail();
  }, [itemId]); // itemId가 변경될 때마다 데이터를 가져오도록 설정

  const haertIcon = heart ? <FaHeart size={25} /> : <FaRegHeart size={25} />;
  const changeHeart = () => {
    setHeart(!heart);
  };

  const minusClick = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
      setWarningMessage("");
    }
  };

  const plusClick = () => {
    if (itemCount < 10) {
      if (itemDetails.stock > itemCount) {
        setItemCount(itemCount + 1);
      } else {
        setWarningMessage("남은 재고의 최대 수량입니다.");
      }
    } else {
      setWarningMessage("10개 이상의 상품을 구매하실 수 없습니다.");
    }
  };

  const scrollToSection = (index) => {
    if (detailRef.current[index]) {
      window.scrollTo({
        top: detailRef.current[index].offsetTop - 248,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const AddCart = () => {
    if (getCookie("Id")) {
      axiosInstance
        .post(`/member/${getCookie("Id")}/cart`, {
          itemId: itemId,
          count: itemCount,
        })
        .then((res) => {
          if (
            window.confirm(
              "Cart에 상품이 담겼습니다. Cart를 확인하고 싶으시다면 '확인'을 눌러주세요."
            )
          ) {
            navigate("/cart");
          } else {
          }

          console.log("AddCart GET ", res);
        })
        .catch((error) => {
          console.error("AddCart GET Error:", error);
          if (error.response.data === "이미 장바구니에 존재한 상품입니다.") {
            // 서버에서 반환된 응답이 있는 경우

            if (
              window.confirm(
                "이미 장바구니에 존재하는 상품입니다. 장바구니로 이동하시겠습니까?"
              )
            ) {
              navigate("/cart");
            } else {
            }
          }
        });
    } else {
      if (
        window.confirm(
          "장바구니에 담으시려면 로그인 해주세요. 로그인하시려면 '확인'을 눌러주세요."
        )
      ) {
        navigate("/login");
      } else {
      }
    }
  };

  const OrderSubmit = () => {
    const modifiedOrderList = [
      {
        itemId: itemId,
        count: itemCount,
      },
    ];
    console.log("modifiedOrderList", modifiedOrderList);
    navigate("/ordercheck", { state: { orders: modifiedOrderList } });
  };

  return (
    <div className="Detail">
      <Container>
        {itemDetails ? (
          <div>
            <div className="item_detail">
              <ImgSlide mainImgDataList={itemDetails.mainImgDataList} />
              <div className="detail">
                {itemDetails.stock !== 0 && itemDetails.stock < 10 ? (
                  <div style={{ paddingBottom: 0 }} className="stock">
                    🔥 <span>품절 임박</span> 🔥
                  </div>
                ) : (
                  ""
                )}
                <p style={{ margin: 10 }} className="icon_star">
                  <FaStar size={15} /> {itemDetails.averageStar.toFixed(1)}
                </p>
                <h2>{itemDetails.name}</h2>
                <div className="price_content">
                  <div className="sellPrice">
                    {itemDetails.sellPrice.toLocaleString()}
                  </div>
                  {itemDetails.discountRate !== 0 && (
                    <>
                      <div className="discountRate">
                        {itemDetails.discountRate}%
                      </div>
                      <div className="price">
                        {itemDetails.price.toLocaleString()}
                      </div>
                    </>
                  )}
                </div>

                <div className="info">
                  <div>
                    <div className="title">적립금</div>
                    <div className="content">결제 금액의 등급별 적립</div>
                    <div>
                      {/* 포인트 설명 모달 설정하기 */}
                      <FaQuestionCircle
                        className="point"
                        size={13}
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      />
                      <ModalContainer
                        isOpen={modalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        customStyles={customStyles}
                      >
                        <DetailQuestionMark />
                      </ModalContainer>
                    </div>
                  </div>
                  <div>
                    <div className="title">배송비</div>
                    <div className="content">무료 배송</div>
                  </div>
                </div>
                {itemDetails.stock !== 0 ? (
                  <>
                    <div className="count">
                      <div>
                        <div className="counter">
                          <button onClick={minusClick}>
                            <FaMinus size={11} />
                          </button>
                          <input
                            type="text"
                            name="itemCount"
                            value={itemCount}
                            readOnly
                          />
                          <button onClick={plusClick}>
                            <FaPlus size={12} />
                          </button>
                        </div>
                        {itemDetails.stock < 10 ? (
                          <div className="stock">
                            (남은 수량: <strong>{itemDetails.stock}</strong>)
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>{itemDetails.sellPrice.toLocaleString()}</div>
                    </div>
                    {warningMessage && (
                      <div
                        style={{
                          border: "none",
                          color: "rgb(220, 0, 0)",
                          fontSize: 13,
                          fontWeight: "bold",
                        }}
                        className="warning-message"
                      >
                        {warningMessage}
                      </div>
                    )}

                    <div className="total">
                      <div className="totalTitle">합계</div>
                      <div className="totalPrice">
                        {(itemDetails.sellPrice * itemCount).toLocaleString()}
                      </div>
                    </div>

                    <div className="payment">
                      <button className="heart" onClick={changeHeart}>
                        {haertIcon}
                      </button>
                      <button onClick={AddCart} className="cart">
                        <div>
                          <TiShoppingCart style={{ marginTop: 7 }} size={28} />
                        </div>
                        <div>장바구니</div>
                      </button>
                      <button onClick={OrderSubmit} className="pay">
                        <div>
                          <MdPayment style={{ marginTop: 7 }} size={28} />
                        </div>
                        <div>구매하기</div>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="payment">
                    <button className="heart" onClick={changeHeart}>
                      {haertIcon}
                    </button>
                    <button onClick={AddCart} className="cart">
                      <div>
                        <TiShoppingCart style={{ marginTop: 7 }} size={28} />
                      </div>
                      <div>장바구니</div>
                    </button>
                    <button
                      style={{ backgroundColor: "#aaa", cursor: "default" }}
                      className="pay"
                    >
                      <div>
                        <MdPayment style={{ marginTop: 7 }} size={28} />
                      </div>
                      <div>구매 불가</div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="itemContent">
              <div className="detail_bar">
                <ul>
                  <li>
                    <button
                      className={activeIndex === 0 ? "active" : ""}
                      onClick={() => scrollToSection(0)}
                    >
                      상세 정보
                    </button>
                  </li>
                  <li>
                    <button
                      className={activeIndex === 1 ? "active" : ""}
                      onClick={() => scrollToSection(1)}
                    >
                      리뷰
                    </button>
                  </li>
                  <li>
                    <button
                      className={activeIndex === 2 ? "active" : ""}
                      onClick={() => scrollToSection(2)}
                    >
                      Q&A
                    </button>
                  </li>
                </ul>
              </div>

              <div ref={(el) => (detailRef.current[0] = el)}>
                <DetailImg
                  content={itemDetails.content}
                  subImgDataList={itemDetails.subImgDataList}
                />
              </div>
              <div ref={(el) => (detailRef.current[1] = el)}>
                <DetailReview starsPoint={itemDetails.averageStar} />
              </div>
              <div ref={(el) => (detailRef.current[2] = el)}>
                <DetailQandA />
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default Detail;
