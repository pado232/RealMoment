import { useEffect, useState } from "react";

const OrderBill = ({ orderList, usePonit, onSubmit, buyPrice }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const stickyPoint = 100; // 스크롤 위치가 100px 이상일 때 고정
      if (offset > stickyPoint) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="Bill">
      <div className={`BillSc ${isSticky ? "sticky" : ""}`}>
        <div className="BillContent">
          <h3>
            <center>결제 정보</center>
          </h3>
          <div>
            <div className="content">
              <div className="between">
                <div>주문 금액</div>
                <div className="content">
                  {orderList?.totalPrice?.toLocaleString() || 0} 원
                </div>
              </div>
              <div className="between">
                <div>할인 금액</div>
                <div className="content">
                  - {orderList?.totalDiscountPrice?.toLocaleString() || 0} 원
                </div>
              </div>
              <div className="between">
                <div>배송비</div>
                <div className="content">무료</div>
              </div>
              <div className="between">
                <div>적립예정 포인트</div>
                <div className="content">
                  {orderList?.getPoint?.toLocaleString() || 0} P
                </div>
              </div>
              <div className="between">
                <div>사용예정 포인트</div>
                <div className="content">
                  - {usePonit?.toLocaleString() || 0} P
                </div>
              </div>
            </div>
            <div className="total">
              <div className="between">
                <div>
                  <strong>결제예정 합계</strong>
                </div>
                <div className="totalPrice">
                  {buyPrice?.toLocaleString() || 0} 원
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="btn_warpper">
          <button
            style={{ backgroundColor: "rgb(136, 129, 229)" }}
            onClick={onSubmit}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderBill;
