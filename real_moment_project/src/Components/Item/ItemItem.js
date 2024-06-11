import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { MdPayment } from "react-icons/md";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";

import "../../styles/item.css";

const ItemItem = ({
  itemId,
  mainImg,
  name,
  price,
  sellPrice,
  discountRate,
}) => {
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  const iconSize = 10 * 2;
  const iconCartSize = 12 * 2;

  const haertIcon = heart ? (
    <FaHeart size={iconSize} />
  ) : (
    <FaRegHeart size={iconSize} />
  );
  const changeHeart = () => {
    setHeart(!heart);
  };

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
          console.error("AddCart GET Error:", error);
          // 장바구니에 이미 존재하는 아이템에 대한 구현 필요
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

  return (
    <div className="ItemItem">
      <div className="goDetail" onClick={() => navigate(`/detail/${itemId}`)}>
        <div className="box_img">
          <img alt={`${name} 이미지`} src={mainImg} />
        </div>
        <div className="box_content">
          <div className="name">{name}</div>
          {discountRate === 0 ? (
            <div className="price">
              <span className="sale_price">{price.toLocaleString()}원</span>
            </div>
          ) : (
            <div className="price">
              <span className="sale_price">{sellPrice.toLocaleString()}원</span>
              <span className="sale">{discountRate}%</span>
              <span className="regular_price">{price.toLocaleString()}원</span>
            </div>
          )}
        </div>
      </div>

      <div className="payment">
        <div>
          <button onClick={changeHeart}>{haertIcon}</button>
        </div>
        <div>
          <button onClick={AddCart}>
            <TiShoppingCart size={iconCartSize} />
          </button>
        </div>
        <div>
          <button>
            <MdPayment size={iconCartSize} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemItem;
