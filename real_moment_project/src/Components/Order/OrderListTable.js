import { useRef, useState } from "react";

import WhiteButton from "../../util/Buttons/WhiteButton";
import { AiFillHome } from "react-icons/ai";
import { CiMemoPad } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

import "../../styles/OrderListTable.css";
import ModalContainer from "../../util/ModalContainer";
import ReviewWriteBox from "../Review/ReviewWriteBox";

import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";

const OrderListTable = ({
  isWriteModalOpen,
  setIsWriteModalOpen,
  orderList,
}) => {
  const customStyles = {
    content: {
      top: "55%",
      left: "55%",
      right: "auto",
      bottom: "auto",
      height: "720px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  };
  const inputRef = useRef([]);
  const [currentDetail, setCurrentDetail] = useState(null);
  const [review, setReview] = useState({
    title: "",
    content: "",
    star: 5,
  });

  const handleStateChange = (e) => {
    const { name, value } = e.target;

    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = (orderId, itemId) => {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }
    setIsWriteModalOpen(false);
    ReviewCreate(orderId, itemId);
  };

  const ReviewCreate = (orderId, itemId) => {
    console.log(
      "확인하기 ",
      orderId,
      itemId,
      review.title,
      review.content,
      review.star
    );
    axiosInstance
      .post(`/member/${getCookie("Id")}/review`, {
        orderId: orderId,
        itemId: itemId,
        title: review.title,
        content: review.content,
        star: review.star,
      })
      .then((res) => {
        console.log("ReviewCreate POST ", res);
      })
      .catch((error) => {
        console.error("ReviewCreate POST Error:", error);
      });
  };

  const reviewWriteClick = (detail) => {
    setReview({
      title: "",
      content: "",
      star: 5,
    });
    setCurrentDetail(detail);
    setIsWriteModalOpen(true);
  };

  const handleStarClick = (star) => {
    setReview({ ...review, star: star });
  };

  const renderStarIcon = (index) => {
    const iconSize = 10 * 3;
    if (review.star >= index) {
      return <FaStar size={iconSize} onClick={() => handleStarClick(index)} />;
    } else {
      return (
        <FaRegStar size={iconSize} onClick={() => handleStarClick(index)} />
      );
    }
  };

  return (
    <div className="ListTable">
      <table>
        <colgroup style={{ width: 420 }} />
        <colgroup style={{ width: 300 }} />
        <colgroup span={"3"} style={{ width: 200 }} />

        <thead>
          <tr>
            <th>상품정보</th>
            <th>배송정보</th>
            <th>주문일자</th>
            <th>결제금액</th>
            <th>주문상태</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                <div> 해당 데이터가 없습니다.</div>
              </td>
            </tr>
          ) : (
            orderList.map((order, index) => (
              <tr key={index}>
                <td>
                  {order.orderDetails.map((detail, index) => (
                    <div key={index}>
                      <div className="iteminfo">
                        {/** 나중에 a태그로 img 클릭하면 상세 페이지로 갑니다 */}
                        <div className="img">
                          <img alt="상품정보이미지" src={detail.item.mainImg} />
                        </div>

                        <div className="content">
                          {/* <div>{detail.orderDetailId}</div> */}
                          <div>
                            <strong>{detail.item.name}</strong>
                          </div>
                          <div className="content_box">
                            <div>
                              <span>{detail.item.price.toLocaleString()}</span>
                              원
                            </div>
                            <div style={{ color: "red" }}>
                              {detail.item.discountRate}%
                            </div>
                            <div>
                              (-{detail.item.discountPrice.toLocaleString()}원)
                            </div>
                          </div>
                          <div>
                            <div style={{ textAlign: "end" }}>
                              {" "}
                              {detail.item.sellPrice.toLocaleString()}원
                            </div>
                          </div>
                          <div className="sellPrice">
                            <div className="count">{detail.itemCount}개</div>
                            <div className="totalPrice">
                              {detail.totalPrice.toLocaleString()}원
                            </div>
                          </div>
                          {/* <div>
                          {detail.item.sell === true ? "판매중" : "판매 중지"}
                        </div> */}

                          <div>{detail.item.mainImg}</div>
                        </div>
                      </div>
                      <div>
                        {order.status === "구매확정" && !detail.reviewStatus ? (
                          <div className="btn_box">
                            <WhiteButton
                              buttonText={`${detail.item.name} 리뷰 작성하기`}
                              onClick={() => reviewWriteClick(detail)}
                            />

                            <ModalContainer
                              isOpen={isWriteModalOpen}
                              onRequestClose={() => setIsWriteModalOpen(false)}
                              customStyles={customStyles}
                            >
                              {currentDetail && (
                                <ReviewWriteBox
                                  h2Text={`리뷰 작성하기`}
                                  itemImg={currentDetail.item.mainImg}
                                  itemName={currentDetail.item.name}
                                  setIsModalOpen={setIsWriteModalOpen}
                                  onClick={() =>
                                    handleSubmit(
                                      order.orderId,
                                      currentDetail.item.itemId
                                    )
                                  }
                                  inputRef={inputRef}
                                  textareaValue={review.content}
                                  inputValue={review.title}
                                  onChange={handleStateChange}
                                  renderStarIcon={renderStarIcon}
                                />
                              )}
                            </ModalContainer>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </td>

                <td>
                  <div className="delivery">
                    <center>
                      <div
                        style={{
                          marginBottom: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {order.orderId}
                      </div>
                    </center>

                    <div>
                      <div>
                        <AiFillHome className="icon" size={10 * 2} />
                      </div>

                      <div>
                        <span>[ {order.zipCode} ] </span>
                        <span>{order.mainAddress},</span>{" "}
                        <span>{order.detAddress}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <CiMemoPad className="icon" size={10 * 2} />
                      </div>
                      <div>{order.requestText}</div>
                    </div>

                    <div>
                      <div>
                        <BsFillTelephoneFill className="icon" size={9 * 2} />
                      </div>
                      <div> {order.tel}</div>
                    </div>
                    {/* <div>{order.merchantUid}</div> */}
                  </div>
                </td>
                <td>
                  <div>{order.orderedDate.toString().split("T")[0]}</div>
                </td>
                <td>
                  <div>{order.buyPrice.toLocaleString()} 원</div>
                </td>
                <td>
                  <div>{order.status}</div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default OrderListTable;
