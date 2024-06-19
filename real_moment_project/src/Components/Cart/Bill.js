import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Bill = ({ orderList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("orderList updated:", orderList);
  }, [orderList]);

  // Filter out items with no stock before calculating the order amount
  const filteredOrderList = orderList.filter((item) => item.stock > 0);

  filteredOrderList.forEach((item) => {
    console.log(`Item ID: ${item.itemId}, Stock: ${item.stock}`);
  });

  const orderAmount = filteredOrderList.reduce(
    (total, item) => total + item.sellPrice * item.count,
    0
  );

  const modifiedOrderList = filteredOrderList.map(({ itemId, count }) => ({
    itemId,
    count,
  }));

  console.log("modifiedOrderList", modifiedOrderList);

  const OrderSubmit = () => {
    if (modifiedOrderList.length > 0) {
      navigate("/ordercheck", { state: { orders: modifiedOrderList } });
    } else {
      window.alert("상품을 선택해주세요.");
    }
  };

  return (
    <div className="Bill">
      <div className="BillContent">
        <h3>
          <center>결제 정보</center>
        </h3>
        <div>
          <div className="content">
            <div className="between">
              <div>주문 금액</div>
              <div className="content">{orderAmount.toLocaleString()} 원</div>
            </div>
            <div className="between">
              <div>배송비</div>
              <div className="content">무료</div>
            </div>
            <div
              style={{ fontSize: 12, margin: "20px 0", textAlign: "center" }}
            >
              자세한 사항은 주문하기에서 확인 가능합니다.
            </div>
          </div>
          <div className="total">
            <div className="between">
              <div>
                <strong>결제예정 합계</strong>
              </div>
              <div className="totalPrice">
                {orderAmount.toLocaleString()} 원
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="btn_warpper">
        <button onClick={OrderSubmit}>주문하기</button>
      </div>
    </div>
  );
};

export default Bill;
