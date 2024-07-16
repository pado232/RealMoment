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
import DateFormat from "../../util/DateFormat";

const OrderListTable = ({
  isWriteModalOpen,
  setIsWriteModalOpen,
  orderList,
  triggerRefresh, // 새로고침 트리거 함수
  fetchOrderList,
  setProfileUpdated,
  profileUpdated,
  reviewCountUpdated,
  setReviewCountUpdated,
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

  const [cancelReasons, setCancelReasons] = useState({});
  const [refundReasons, setRefundReasons] = useState({});

  const handleStateChange = (e) => {
    const { name, value } = e.target;

    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleReasonChange = (orderId, type) => (e) => {
    const { value } = e.target;
    if (type === "cancel") {
      setCancelReasons((prev) => ({
        ...prev,
        [orderId]: value,
      }));
    } else if (type === "refund") {
      setRefundReasons((prev) => ({
        ...prev,
        [orderId]: value,
      }));
    }
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
    axiosInstance
      .post(`/member/${getCookie("Id")}/review`, {
        orderId: orderId,
        itemId: itemId,
        title: review.title,
        content: review.content,
        star: review.star,
      })
      .then((res) => {
        fetchOrderList(); // 제출 후 새로고침 트리거
        triggerRefresh(); // 리뷰 제출 후 새로고침 트리거

        setReviewCountUpdated(!reviewCountUpdated);

        console.log("ReviewCreate POST ", res);
      })
      .catch((error) => {
        console.error("ReviewCreate POST Error:", error);
        console.error("ReviewCreate POST Error detail:", error.response.data);
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

  const OrderCancel = (orderId) => {
    if (!cancelReasons[orderId]) {
      alert("취소 사유를 선택해 주세요.");
      document.getElementsByName("cancelReason")[0].focus();
      return;
    }

    if (window.confirm("결제를 취소하시겠습니까?")) {
      axiosInstance
        .post(`/member/${getCookie("Id")}/order/cancel`, {
          orderId: orderId,
          reasonText: cancelReasons[orderId],
        })
        .then((res) => {
          fetchOrderList(); // 제출 후 새로고침 트리거
          console.log("OrderCancel POST ", res);
        })
        .catch((error) => {
          console.error("OrderCancel POST Error:", error);
          alert(
            "상품의 주문 상태가 이미 변경 되었습니다. 주문 내역을 새로고침합니다."
          );
          fetchOrderList();
        });
    }
  };

  const OrderRefund = (orderId) => {
    if (!refundReasons[orderId]) {
      alert("환불 사유를 선택해 주세요.");
      document.getElementsByName("refundReason")[0].focus();
      return;
    }

    if (window.confirm("환불 신청을 진행하시겠습니까?")) {
      axiosInstance
        .patch(`/member/${getCookie("Id")}/order/refund`, {
          orderId: orderId,
          reasonText: refundReasons[orderId],
        })
        .then((res) => {
          fetchOrderList(); // 제출 후 새로고침 트리거
          console.log("OrderRefund PATCH ", res);
        })
        .catch((error) => {
          console.error("OrderRefund PATCH Error:", error);
          alert(
            "상품의 주문 상태가 이미 변경 되었습니다. 주문 내역을 새로고침합니다."
          );
          fetchOrderList();
        });
    }
  };

  const OrderDone = (orderId) => {
    if (window.confirm("구매를 확정하시겠습니까?")) {
      axiosInstance
        .patch(`/member/${getCookie("Id")}/order/done`, {
          orderId: orderId,
        })
        .then((res) => {
          fetchOrderList(); // 제출 후 새로고침 트리거
          setProfileUpdated(!profileUpdated);
          console.log("OrderDone PATCH ", res);
        })
        .catch((error) => {
          console.error("OrderDone PATCH Error:", error);
          alert(
            "상품의 주문 상태가 이미 변경 되었습니다. 주문 내역을 새로고침합니다."
          );
          fetchOrderList();
        });
    }
  };

  return (
    <div className="ListTable">
      <table>
        <colgroup style={{ width: 500 }} />
        <colgroup style={{ width: 400 }} />
        <colgroup style={{ width: 250 }} />
        <colgroup style={{ width: 150 }} />
        <colgroup style={{ width: 350 }} />

        <thead>
          <tr>
            <th>상품정보</th>
            <th>배송정보</th>
            <th>주문번호 / 주문일자</th>
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
                      <div
                        className={
                          detail.item.sell === true
                            ? "iteminfo"
                            : "iteminfo none"
                        }
                      >
                        {detail.item.sell ? (
                          <a href={`/detail/${detail.item.itemId}`}>
                            <div
                              className={`img ${
                                detail.item.stock === 0 ||
                                detail.item.sell === false
                                  ? "stock-overlay"
                                  : ""
                              }`}
                            >
                              {detail.item.stock === 0 && (
                                <div className="stock-text">SOLD OUT</div>
                              )}
                              <img
                                alt="상품정보이미지"
                                src={detail.item.mainImg}
                              />
                            </div>
                          </a>
                        ) : (
                          <div
                            className={`img ${
                              detail.item.stock === 0 ||
                              detail.item.sell === false
                                ? "stock-overlay"
                                : ""
                            }`}
                          >
                            {detail.item.stock === 0 && (
                              <div className="stock-text">SOLD OUT</div>
                            )}
                            <img
                              alt="상품정보이미지"
                              src={detail.item.mainImg}
                            />
                          </div>
                        )}

                        <div className="content">
                          {/* <div>{detail.orderDetailId}</div> */}
                          <div className="item_title">
                            <div>
                              <strong>{detail.item.name}</strong>
                            </div>
                          </div>
                          <div className="content_box">
                            {detail.discountRate === 0 ? (
                              ""
                            ) : (
                              <>
                                <div>
                                  <span>{detail.price.toLocaleString()}원</span>
                                </div>
                                <div style={{ color: "red" }}>
                                  {detail.discountRate}%
                                </div>
                              </>
                            )}

                            {/* <div>
                              (-{detail.discountPrice.toLocaleString()}
                              원)
                            </div> */}
                          </div>
                          <div>
                            <div> {detail.sellPrice.toLocaleString()}원</div>
                          </div>
                        </div>

                        <div className="count">{detail.itemCount}개</div>
                        {/* <div className="totalPrice">
                            {detail.totalPrice.toLocaleString()}원
                          </div> */}

                        <div className="totalPrice">
                          {detail.totalPrice.toLocaleString()}원
                        </div>
                      </div>
                      {index < order.orderDetails.length - 1 && (
                        <div
                          style={{
                            marginLeft: "5%",
                            width: "90%",
                            borderBottom: "1px dashed #ccc",
                          }}
                        ></div>
                      )}

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
                  ))}
                </td>

                <td>
                  <div className="delivery">
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
                    {/* <div>{order.orderId}</div> */}
                  </div>
                </td>
                <td>
                  <center>
                    <div
                      style={{
                        marginBottom: 5,
                        fontWeight: "bold",
                      }}
                    >
                      {order.merchantUid}
                    </div>
                  </center>
                  <div className="date">
                    <DateFormat dateString={order.orderedDate} />
                  </div>
                </td>
                <td>
                  <div>{order.buyPrice.toLocaleString()} 원</div>
                </td>
                <td>
                  <div className="order_state">
                    <div className="state_title">{order.status}</div>

                    {order.status === "배송완료" ? (
                      <div className="btn_warpper">
                        <div>
                          <button onClick={() => OrderDone(order.orderId)}>
                            구매확정
                          </button>
                        </div>

                        <div>
                          <button onClick={() => OrderRefund(order.orderId)}>
                            환불신청
                          </button>
                          <div>
                            <select
                              name="refundReason"
                              value={refundReasons[order.orderId] || ""}
                              onChange={handleReasonChange(
                                order.orderId,
                                "refund"
                              )}
                              className="reason"
                            >
                              <option value="">환불 사유 선택</option>
                              <option value="변심">변심</option>
                              <option value="불량">불량</option>
                              <option value="기타">기타</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : order.status === "결제완료" ? (
                      <div className="btn_warpper">
                        <button onClick={() => OrderCancel(order.orderId)}>
                          결제취소
                        </button>
                        <div>
                          <select
                            name="cancelReason"
                            value={cancelReasons[order.orderId] || ""}
                            onChange={handleReasonChange(
                              order.orderId,
                              "cancel"
                            )}
                            className="reason"
                          >
                            <option value="">취소 사유 선택</option>
                            <option value="변심">변심</option>
                            <option value="배송 지연">배송 지연</option>
                            <option value="기타">기타</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
