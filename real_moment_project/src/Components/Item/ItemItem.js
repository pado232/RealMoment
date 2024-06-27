import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { MdPayment } from "react-icons/md";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import { FaStar } from "react-icons/fa";

import "../../styles/item.css";

const ItemItem = ({
  wishId,
  itemId,
  mainImg,
  name,
  price,
  sellPrice,
  discountRate,
  haertPage,
  fetchHeartItem,
  averageStar,
  stock,
}) => {
  const navigate = useNavigate();
  const [heartAnimating, setHeartAnimating] = useState(false);

  const AddCart = () => {
    if (getCookie("Id")) {
      axiosInstance
        .post(`/member/${getCookie("Id")}/cart`, {
          itemId: itemId,
          count: 1,
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
          } else {
            console.error("AddCart GET Error:", error);
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

  const AddHeart = () => {
    setHeartAnimating(true);
    setTimeout(() => {
      setHeartAnimating(false);
    }, 500); // 0.5초 후에 애니메이션 클래스 제거

    if (getCookie("Id")) {
      axiosInstance
        .post(`/member/${getCookie("Id")}/wish`, {
          itemId: itemId,
        })
        .then((res) => {
          console.log("AddHeart GET ", res);
        })
        .catch((error) => {
          if (error.response.data === "이미 찜에 등록되어 있습니다.") {
            // 서버에서 반환된 응답이 있는 경우

            if (
              window.confirm(
                "이미 하트함에 존재하는 상품입니다. 하트함로 이동하시겠습니까?"
              )
            ) {
              navigate("/heart");
            } else {
            }
          } else {
            console.error("AddHeart GET Error:", error);
          }
        });
    } else {
      if (
        window.confirm(
          "하트함에 담으시려면 로그인 해주세요. 로그인하시려면 '확인'을 눌러주세요."
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
        count: 1,
      },
    ];
    console.log("modifiedOrderList", modifiedOrderList);
    if (window.confirm(`${name}(을)를 주문하시겠습니까?`)) {
      navigate("/ordercheck", { state: { orders: modifiedOrderList } });
    } else {
    }
  };

  const DeleteHeart = (wishId) => {
    axiosInstance
      .delete(`/member/${getCookie("Id")}/wish?wishId=${wishId}`)
      .then((res) => {
        fetchHeartItem();
        console.log("DeleteHeart GET ", res);
      })
      .catch((error) => {
        console.error("DeleteHeart GET Error:", error);
      });
  };

  return (
    <div className="ItemItem">
      <div className="goDetail" onClick={() => navigate(`/detail/${itemId}`)}>
        <div className={`box_img ${stock === 0 ? "stock-overlay" : ""}`}>
          {stock === 0 && <div className="stock-text">SOLD OUT</div>}
          <img alt={`${name} 이미지`} src={mainImg} />
        </div>

        <div className="box_content">
          <div className="name">
            {stock !== 0 && stock < 10 ? (
              <span className="stock">🔥품절 임박🔥 </span>
            ) : (
              ""
            )}
            {name}
          </div>
          <div className="star_box">
            <div className="icon">
              <FaStar size={15} />
            </div>
            <div>{averageStar.toFixed(1)}</div>
          </div>
          {discountRate === 0 ? (
            <div className="sale_price" style={{ paddingTop: 5 }}>
              {price.toLocaleString()}원
            </div>
          ) : (
            <div>
              <div className="price">
                <div className="sale_price">{sellPrice.toLocaleString()}원</div>
                <div className="sale">{discountRate}%</div>
              </div>
              <span className="regular_price">{price.toLocaleString()}원</span>
            </div>
          )}
        </div>
      </div>

      <div className="payment">
        {haertPage === "하트함" ? (
          <div>
            <button onClick={() => DeleteHeart(wishId)}>
              <FaHeart size={20} color="rgb(255, 0, 85)" />
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={AddHeart}
              className={heartAnimating ? "heart-animating" : ""}
            >
              {heartAnimating ? (
                <FaHeart size={20} className="heartClick" />
              ) : (
                <FaRegHeart size={20} />
              )}
            </button>
          </div>
        )}

        <div>
          <button onClick={AddCart}>
            <TiShoppingCart size={24} />
          </button>
        </div>
        <div>
          <button onClick={OrderSubmit}>
            <MdPayment size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemItem;
