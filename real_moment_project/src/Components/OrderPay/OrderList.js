import "../../styles/OrderList.css";

const OrderList = ({ orderList }) => {
  return (
    <div className="OrderList">
      {orderList.length === 0 ? (
        <div className="none_cart_list">주문 리스트가 존재하지 않습니다.</div>
      ) : (
        orderList.map((order, index) => (
          <div className="cart_list" key={index}>
            <div className="img">
              <img
                style={{ width: 90, height: 90, margin: 10, paddingLeft: 20 }}
                alt={`${order.name} 이미지`}
                src={order.mainImg}
              />
            </div>
            <div className="info_content">
              <div className="title">
                <div>{order.name}</div>
              </div>
              {order.discountRate !== 0 ? (
                <div className="info">
                  <div className="price">{order.price.toLocaleString()}원</div>
                  <div className="discountRate">{order.discountRate}%</div>
                  <div className="discountPrice">
                    -{order.discountPrice.toLocaleString()}원
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="info_price">
                <div>{order.sellPrice.toLocaleString()} 원</div>
              </div>
            </div>
            <div className="count_box">
              <div className="count">
                <div>{order.count} 개</div>
                <div className="totalPrice">
                  <div>{order.totalSellPrice.toLocaleString()} 원</div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
