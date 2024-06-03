import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { MdPayment } from "react-icons/md";

const ItemItem = ({
  itemId,
  mainImg,
  name,
  price,
  sellPrice,
  discountRate,
}) => {
  //   const { selectedCategory } = useCategory();

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
  return (
    <div className="ItemItem">
      {/* href={`/item/${selectedCategory}/detail/${itemId}`} */}
      <div className="box_img">
        <img alt="상품이미지" src={mainImg} />
      </div>
      <div className="box_content">
        <div className="name">{name}</div>
        <div className="price">
          <span className="sale_price">{sellPrice}원</span>
          <span className="sale">{discountRate}%</span>
          <span className="regular_price">{price}원</span>
        </div>
      </div>

      <div className="payment">
        <div onClick={changeHeart}>{haertIcon}</div>
        <div>
          <a href="/">
            <TiShoppingCart size={iconCartSize} />
          </a>
        </div>
        <div>
          <a href="/">
            <MdPayment size={iconCartSize} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ItemItem;
