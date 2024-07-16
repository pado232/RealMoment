import { useState, useRef, useEffect, useCallback } from "react";
import Modal from "react-modal";
import ModalContainer from "../../util/ModalContainer";
import ReviewWriteBox from "./ReviewWriteBox";
import WhiteButton from "../../util/Buttons/WhiteButton";
import ReviewLookBox from "./ReviewLookBox";

import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import Pagination from "../../util/Pagination";

import "../../styles/MyPage.css";

Modal.setAppElement("#root");

const ReviewMine = () => {
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

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isLookModalOpen, setIsLookModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewList, setReviewList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [review, setReview] = useState({
    reviewId: "",
    title: "",
    content: "",
    star: "",
  });

  const MyReviewList = useCallback(() => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/reviewList?nowPage=${nowPage}`)
      .then((res) => {
        const reviewListdata = res.data.reviewList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        setReviewList(reviewListdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);

        console.log("MyReviewList GET ", res);
      })
      .catch((error) => {
        console.error("MyReviewList GET Error:", error);
      });
  }, [nowPage]);

  const MyReviewEditData = (reviewId) => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/review/data?reviewId=${reviewId}`)
      .then((res) => {
        const reviewdata = res.data;

        setReview(reviewdata);

        console.log("MyReviewEditData GET ", res);
      })
      .catch((error) => {
        console.error("MyReviewEditData GET Error:", error);
      });
  };

  const MyReviewEdit = (reviewId) => {
    axiosInstance
      .patch(`/member/${getCookie("Id")}/review`, {
        reviewId: reviewId,
        title: review.title,
        content: review.content,
        star: review.star,
      })
      .then((res) => {
        console.log("MyReviewEdit GET ", res);
      })
      .catch((error) => {
        console.error("MyReviewEdit GET Error:", error);
      });
  };

  useEffect(() => {
    MyReviewList();
  }, [MyReviewList, nowPage]);

  const openWriteModal = (index) => {
    const review = reviewList[index];
    setSelectedItem(review);
    MyReviewEditData(review.reviewId);
    setIsWriteModalOpen(true);
  };

  const openLookModal = (index) => {
    const review = reviewList[index];
    setSelectedItem(review);
    MyReviewEditData(review.reviewId);
    setIsLookModalOpen(true);
  };

  const inputRef = useRef([]);

  const handleStateChange = (e) => {
    const { name, value } = e.target;

    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = (reviewId) => {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }
    setIsWriteModalOpen(false);
    MyReviewEdit(reviewId);
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
    <div className="ReviewMine">
      <h2>내가 작성한 리뷰</h2>

      <table>
        <colgroup style={{ width: 500 }} />
        <colgroup style={{ width: 250 }} />
        <colgroup style={{ width: 300 }} />
        <thead>
          <tr>
            <th>상품정보</th>
            <th>작성일자</th>
            <th>작성한 리뷰</th>
          </tr>
        </thead>
        <tbody>
          {reviewList.map((review, index) => (
            <tr key={index}>
              <td>
                <div className="iteminfo">
                  <a
                    href={
                      review.item.sell === true
                        ? `/detail/${review.item.itemId}`
                        : ""
                    }
                  >
                    <div
                      className={`img_box ${
                        review.item.stock === 0 || review.item.sell === false
                          ? "stock-overlay"
                          : ""
                      }`}
                    >
                      {review.item.stock === 0 && (
                        <div className="stock-text">SOLD OUT</div>
                      )}
                      <img alt="상품정보이미지" src={review.item.mainImg} />
                    </div>
                  </a>
                  <div className="detail_box" style={{ marginLeft: 20 }}>
                    <div>
                      <a
                        href={
                          review.item.sell === true
                            ? `/detail/${review.item.itemId}`
                            : ""
                        }
                      >
                        <strong>{review.item.name}</strong>
                      </a>
                    </div>

                    <div className="detail">
                      {/* <div className="price">
                        <span>{review.item.price.toLocaleString()}</span>원
                      </div>
                      <div>{review.item.discountRate}%</div>
                      <div>
                        (-{review.item.discountPrice.toLocaleString()}원)
                      </div> */}

                      {/* <div>
                        {review.item.sell === true ? "판매중" : "판매중지"}
                      </div> */}
                    </div>
                    {/* <div>{review.item.sellPrice}원</div> */}
                  </div>
                </div>
              </td>
              <td>
                <div className="date">
                  <div>
                    [작성일자] : {review.createdDate.toString().split("T")[0]}
                  </div>
                  <div>
                    [수정일자] :{" "}
                    {review.lastModifiedDate.toString().split("T")[0]}
                  </div>
                </div>
              </td>
              <td>
                <center>
                  <div className="button_warpper">
                    <WhiteButton
                      buttonText={"수정하기"}
                      onClick={() => openWriteModal(index)}
                    />
                    <WhiteButton
                      style={{ marginLeft: 20 }}
                      buttonText={"리뷰 보기"}
                      onClick={() => openLookModal(index)}
                    />
                  </div>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalContainer
        isOpen={isWriteModalOpen}
        onRequestClose={() => setIsWriteModalOpen(false)}
        customStyles={customStyles}
      >
        {selectedItem && (
          <ReviewWriteBox
            h2Text={"나의 리뷰 수정하기"}
            itemImg={selectedItem.item.mainImg}
            itemName={selectedItem.item.name}
            setIsModalOpen={setIsWriteModalOpen}
            onClick={() => handleSubmit(selectedItem.reviewId)}
            inputRef={inputRef}
            textareaValue={review.content}
            inputValue={review.title}
            onChange={handleStateChange}
            renderStarIcon={renderStarIcon}
          />
        )}
      </ModalContainer>

      <ModalContainer
        isOpen={isLookModalOpen}
        onRequestClose={() => setIsLookModalOpen(false)}
        customStyles={customStyles}
      >
        {selectedItem && (
          <ReviewLookBox
            itemImg={selectedItem.item.mainImg}
            itemName={selectedItem.item.name}
            itemTitle={review.title}
            itemContent={review.content}
            itemStars={review.star}
            itemPrice={selectedItem.item.price}
            setIsModalOpen={setIsLookModalOpen}
          />
        )}
      </ModalContainer>

      <div className="pagination">
        <Pagination
          setNowPage={setNowPage}
          nowPage={nowPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};
export default ReviewMine;
