import { useLocation, useNavigate } from "react-router-dom";
import Container from "../util/Container";
import OrderList from "../Components/OrderPay/OrderList";
import "../styles/OrderCheckInfo.css";
import usePageTitle from "../hooks/usePageTitle";

const OrderCheckInfo = () => {
  usePageTitle(`결제 확인`);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderList, orderState } = location.state || {};

  return (
    <div className="OrderCheckInfo">
      <Container>
        {orderState?.phone1 === undefined ? (
          <div style={{ margin: "190px 0" }}>
            <center>
              <h2>ERROR</h2>
              <div>주문 데이터가 존재하지 않습니다.</div>
              <div>
                정상 절차를 거쳐 페이지를 이용하지 않을 경우에 에러가 발생할 수
                있습니다.
              </div>
            </center>
          </div>
        ) : (
          <div className="OrderCheckInfo_Container">
            <div className="message">
              <h2>주문이 정상적으로 완료되었습니다.</h2>
              <button className="move" onClick={() => navigate("/item/all")}>
                계속 쇼핑하기
              </button>
              <button
                className="move"
                onClick={() =>
                  navigate("/mypage", { state: { listState: "OrderHistory" } })
                }
              >
                주문 내역 확인하기
              </button>
            </div>
            <div className="OrderContent_Container">
              <div className="delivery_info">
                <div className="title">배송지 정보</div>
                <div className="content">
                  <div>{orderState.name}</div>
                  <div>
                    {`${orderState.phone1}-${orderState.phone2}-${orderState.phone3}`}
                  </div>
                  <div>{`${orderState.addr1}, ${orderState.addr2}`}</div>
                </div>
              </div>
              <div className="item_info">
                <div className="bar">
                  <div className="title">주문 정보</div>
                  <div className="title">
                    총 주문 금액 :{" "}
                    <span>{orderState.buyPrice.toLocaleString()}원</span>
                  </div>
                </div>
                {orderList && <OrderList orderList={orderList} />}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrderCheckInfo;
