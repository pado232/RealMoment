import React, { useState } from "react";

import "../../styles/MyPage.css";

const Review = ({
  barText1,
  barText2,
  h2Text,
  WriteComponent,
  MyComponent,
  MyReviewList,
  reviewCountUpdated,
  setReviewCountUpdated,
}) => {
  const [selectedMenu, setSelectedMenu] = useState("write"); // 기본값은 'write'로 설정

  return (
    <div className="Review">
      <h2 className="mypage_all_h2">{h2Text}</h2>
      <div className="review_cho">
        <div className="review_content">
          <div className="review_menu">
            <ul>
              {/* 각 li를 클릭했을 때 해당하는 메뉴를 선택하도록 onClick 핸들러를 사용 */}
              <li
                className={selectedMenu === "write" ? "clicked" : ""}
                onClick={() => setSelectedMenu("write")}
              >
                {barText1}
              </li>
              <li
                className={selectedMenu === "myReviews" ? "clicked" : ""}
                onClick={() => setSelectedMenu("myReviews")}
              >
                {barText2}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* 선택된 메뉴에 따라 해당하는 컴포넌트를 렌더링 */}
      {selectedMenu === "write" && (
        <WriteComponent
          MyReviewList={MyReviewList}
          reviewCountUpdated={reviewCountUpdated}
          setReviewCountUpdated={setReviewCountUpdated}
        />
      )}
      {selectedMenu === "myReviews" && <MyComponent />}
    </div>
  );
};

export default Review;
