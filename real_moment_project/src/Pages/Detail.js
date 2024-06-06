import axios from "axios";
import Container from "../util/Container";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdPayment } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import ImgSlide from "../util/ImgSlide";

import "../styles/Detail.css";
import DetailImg from "../Components/Detail/DetailImg";
import BarMenu from "../util/BarMenu";
import DetailReview from "../Components/Detail/DetailReview";
import QandA from "../Components/QandA,js/QandA";

const menuItems = [
  { key: "detialInfo", text: "상세 정보", component: DetailImg },
  { key: "detialReview", text: "리뷰", component: DetailReview },
  { key: "QandA", text: "Q&A", component: QandA }, // props: { MyReviewList: someReviewList }
];

const Detail = () => {
  const { itemId } = useParams(); // itemId를 객체에서 추출
  const [heart, setHeart] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0].key);
  const [itemCount, setItemCount] = useState(1);
  const [itemDetails, setItemDetails] = useState(null); // 초기값을 null로 설정

  const fetchItemDetail = () => {
    axios
      .get(`http://localhost:8080/item?itemId=${itemId}`)
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
    setItemCount(itemCount - 1);
  };

  const plusClick = () => {
    setItemCount(itemCount + 1);
  };

  return (
    <div className="Detail">
      <Container>
        {itemDetails ? (
          <div>
            <div className="item_detail">
              <ImgSlide mainImgDataList={itemDetails.mainImgDataList} />
              {/* <div className="img">
               
                <img
                  alt="메인이미지1"
                  src={process.env.PUBLIC_URL + `/image/shadow.jpg`}
                />
              </div> */}
              <div className="detail">
                <h2>{itemDetails.name}</h2>

                <div className="price_content">
                  <div className="sellPrice">
                    {itemDetails.sellPrice.toLocaleString()}
                  </div>
                  <div className="discountRate">
                    {itemDetails.discountRate}%
                  </div>
                  <div className="price">
                    {itemDetails.price.toLocaleString()}
                  </div>
                </div>

                <div className="info">
                  <div>
                    <div className="title">적립금</div>
                    <div className="content">결제 금액의 등급별 적립</div>
                    <div>
                      {/* 포인트 설명 모달 설정하기 */}
                      <FaQuestionCircle className="point" size={13} />
                    </div>
                  </div>
                  <div>
                    <div className="title">배송비</div>
                    <div className="content">무료 배송</div>
                  </div>
                </div>

                <div className="count">
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
                  <div>{itemDetails.sellPrice.toLocaleString()}</div>
                </div>

                <div className="total">
                  <div className="totalTitle">합계</div>
                  <div className="totalPrice">
                    {(itemDetails.sellPrice * itemCount).toLocaleString()}
                  </div>
                </div>

                <div className="payment">
                  <div className="heart" onClick={changeHeart}>
                    {haertIcon}
                  </div>
                  <div className="cart">
                    <div>
                      <TiShoppingCart size={30} />
                    </div>
                    <div>장바구니</div>
                  </div>
                  <div className="pay">
                    <div>
                      <MdPayment size={30} />
                    </div>
                    <div>구매하기</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 200 }}>
              <div>{/* <BarMenu menuItems={menuItems} /> */}</div>

              <div>
                <DetailImg
                  content={itemDetails.content}
                  subImgDataList={itemDetails.subImgDataList}
                />
              </div>
              <div>
                <DetailReview starsPoint={itemDetails.averageStar} />
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
