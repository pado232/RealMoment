import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Pagination from "../../util/Pagination";

const DetailReview = ({ starsPoint }) => {
  const { itemId } = useParams();
  const [reviewList, setReviewList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchReviewList = () => {
    axios
      .get(
        `http://localhost:8080/reviewList?itemId=${itemId}&nowPage=${nowPage}`
      )
      .then((res) => {
        const reviewListData = res.data.reviewList;
        const nowPageData = res.data.nowPage;
        const totalPageData = res.data.totalPage;

        setReviewList(reviewListData);
        setNowPage(nowPageData);
        setTotalPage(totalPageData);

        console.log("ReviewList GET ", res);
      })
      .catch((error) => {
        console.error("ReviewList GET Error:", error);
      });
  };

  useEffect(() => {
    fetchReviewList();
  }, [nowPage]);

  const renderStars = () => {
    const fullStars = Math.floor(starsPoint);
    const decimalPart = starsPoint - fullStars;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} size={28} fill="black" />);
      } else if (decimalPart !== 0 && i === fullStars) {
        stars.push(
          <div
            key={i}
            style={{ display: "inline-block", position: "relative" }}
          >
            <FaRegStar size={28} fill="black" />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: `${decimalPart * 100}%`,
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              <FaStar size={28} fill="black" />
            </div>
          </div>
        );
      } else {
        stars.push(<FaRegStar key={i} size={28} fill="black" />);
      }
    }

    return stars;
  };

  return (
    <div className="DetailReview">
      <div className="review_star">
        <div>
          리뷰 점수
          <div>{renderStars()}</div>
          <div>{starsPoint}</div>
        </div>
        <div>별점별 리뷰 개수</div>
      </div>
      <div>
        <div>별점 목록</div>
        {reviewList.length === 0 ? (
          <div> 후기가 없습니다.</div>
        ) : (
          reviewList.map((review, index) => (
            <div key={index}>
              <div>{review.reviewId}</div>
              <div>{review.loginId}</div>
              <div>{review.title}</div>
            </div>
          ))
        )}
        <div className="pagination">
          <Pagination
            setNowPage={setNowPage}
            nowPage={nowPage}
            totalPage={totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailReview;
