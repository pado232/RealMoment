import React, { useCallback, useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Pagination from "../../util/Pagination";
import axiosInstanceWithoutAuth from "../../api/AxioxInstanceWithoutAuth";

const DetailReview = ({ starsPoint }) => {
  const { itemId } = useParams();
  const [reviewList, setReviewList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [star, setStar] = useState("");

  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);

  const fetchReviewList = useCallback(() => {
    const queryParams = new URLSearchParams({
      itemId: itemId,
      star: star,
      nowPage: nowPage,
    });
    console.log("파라미터", queryParams.toString());
    axiosInstanceWithoutAuth
      .get(`/reviewList?${queryParams.toString()}`)
      .then((res) => {
        const reviewListData = res.data.reviewList;
        const nowPageData = res.data.nowPage;
        const totalPageData = res.data.totalPage;

        const fiveStarData = res.data.fiveStar;
        const fourStarData = res.data.fourStar;
        const threeStarData = res.data.threeStar;
        const twoStarData = res.data.twoStar;
        const oneStarData = res.data.oneStar;

        setReviewList(reviewListData);
        setNowPage(nowPageData);
        setTotalPage(totalPageData);

        setFiveStar(fiveStarData);
        setFourStar(fourStarData);
        setThreeStar(threeStarData);
        setTwoStar(twoStarData);
        setOneStar(oneStarData);

        console.log("ReviewList GET ", res);
      })
      .catch((error) => {
        console.error("ReviewList GET Error:", error);
      });
  }, [nowPage, star, itemId]);

  useEffect(() => {
    fetchReviewList();
  }, [fetchReviewList]);

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

  const renderStarCounts = (starCount) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(<FaStar key={i} size={22} />);
      } else {
        stars.push(<FaRegStar key={i} size={22} />);
      }
    }

    return stars;
  };

  const hiddenId = (id) => {
    let hiddenLoginId = id; // 변수 선언 변경
    if (id) {
      const idLength = id.length;
      const maskedId =
        id.substring(0, idLength / 2 - 1) +
        "*".repeat(4) +
        id.substring(idLength / 2 + 3);
      hiddenLoginId = maskedId;
    }
    return hiddenLoginId;
  };

  const paragraphs = (content) => {
    return content
      .split("\n")
      .map((paragraph, index) => <div key={index}>{paragraph}</div>);
  };

  return (
    <div className="DetailReview">
      <div className="review_star">
        <div className="review_star_total">
          <div className="text">{starsPoint.toFixed(1)} 점</div>
          <div>{renderStars()}</div>
        </div>
        <div>
          <div className="review_star_count">
            <div className="star_num">5</div>
            <div> {renderStarCounts(5)}</div>
            <div>{fiveStar}</div>
          </div>
          <div className="review_star_count">
            <div className="star_num">4</div>
            <div> {renderStarCounts(4)}</div>
            <div>{fourStar}</div>
          </div>
          <div className="review_star_count">
            <div className="star_num">3</div>
            <div> {renderStarCounts(3)}</div>
            <div>{threeStar}</div>
          </div>
          <div className="review_star_count">
            <div className="star_num">2</div>
            <div> {renderStarCounts(2)}</div>
            <div>{twoStar}</div>
          </div>
          <div className="review_star_count">
            <div className="star_num">1</div>
            <div> {renderStarCounts(1)}</div>
            <div>{oneStar}</div>
          </div>
        </div>
      </div>

      <div className="select_star">
        <select
          name="star"
          value={star}
          onChange={(e) => {
            setStar(e.target.value);
            console.log(star);
          }}
        >
          <option value={""}>별점 전체</option>
          <option value={"5"}>5점</option>
          <option value={"4"}>4점</option>
          <option value={"3"}>3점</option>
          <option value={"2"}>2점</option>
          <option value={"1"}>1점</option>
        </select>
      </div>

      <div>
        {reviewList.length === 0 ? (
          <div className="none_review_list">리뷰가 없습니다.</div>
        ) : (
          reviewList.map((review, index) => (
            <div className="review_list" key={index}>
              <div className="info">
                <div>{hiddenId(review.loginId)}</div>
                <div>
                  <span>{review.star}점</span>
                  {renderStarCounts(review.star)}
                </div>

                <div>
                  작성일자 : {review.createdDate.toString().split("T")[0]}
                </div>
                <div style={{ border: "none" }}>
                  수정일자 : {review.lastModifiedDate.toString().split("T")[0]}
                </div>
              </div>

              <div className="review">
                <div className="title">{review.title}</div>
                <div className="content">{paragraphs(review.content)}</div>
              </div>
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
