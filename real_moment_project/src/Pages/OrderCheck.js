import Container from "../util/Container";
import OrderList from "../Components/OrderPay/OrderList";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import { getCookie } from "../api/Cookies";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../styles/Cart.css";
import OrderBill from "../Components/OrderPay/OrderBill";
import PhoneInput from "../util/SignUpInput/PhoneInput";
import AddressInput from "../util/SignUpInput/AddressInput";
import WhiteButton from "../util/Buttons/WhiteButton";
import usePageTitle from "../hooks/usePageTitle";

const OrderCheck = () => {
  usePageTitle(`주문하기`);
  const inputRef = useRef([]);
  const location = useLocation();
  const orders = useMemo(() => location.state?.orders || [], [location.state]);
  const navigate = useNavigate();

  const [orderList, setOrderList] = useState([]);
  const [orderPrice, setOrderPrice] = useState({});
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);

  const [state, setState] = useState({
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    addr1: "",
    addr2: "",
    addrnum: "",
    requestText: "",
    usePoint: 0,
    buyPrice: 0,
  });

  const fetchOrderList = useCallback(() => {
    console.log("Orders to send:", orders);
    axiosInstance
      .post(`/member/${getCookie("Id")}/order/page`, orders)
      .then((res) => {
        const orderListData = res.data.orderItems;
        const orderPriceData = res.data.orderPrice;

        setOrderList(orderListData);
        setOrderPrice(orderPriceData);
        console.log("OrderSubmit GET ", res);
      })
      .catch((error) => {
        if (error.response) {
          // 서버 응답이 있는 경우
          console.error("OrderSubmit GET Error:", error.response.data);
        } else if (error.request) {
          // 요청이 전송되었지만 응답이 없는 경우
          console.error(
            "OrderSubmit GET Error: No response received",
            error.request
          );
        } else {
          // 요청을 설정하는 중에 발생한 에러
          console.error("OrderSubmit GET Error:", error.message);
        }
      });
  }, [orders]);

  useEffect(() => {
    fetchOrderList();
  }, [fetchOrderList]);

  const handleChangeState = (e) => {
    const { name, value } = e.target;

    const newValue = value === undefined ? "" : value;

    if (
      (name === "price" ||
        name === "usePoint" ||
        name === "phone2" ||
        name === "phone3") &&
      !/^\d*$/.test(newValue)
    ) {
      return;
    }

    if (name === "usePoint") {
      const maxUsePoint = orderPrice.totalPrice - orderPrice.totalDiscountPrice;

      if (newValue > orderPrice.point) {
        setState((prevState) => ({
          ...prevState,
          usePoint: orderPrice.point.toString(),
        }));
        return;
      }

      if (newValue > maxUsePoint) {
        setState((prevState) => ({
          ...prevState,
          usePoint: maxUsePoint.toString(),
        }));
        return;
      }

      if (newValue.trim() === "") {
        setState((prevState) => ({
          ...prevState,
          usePoint: "0",
        }));
        return;
      }

      if (newValue[0] === "0") {
        setState((prevState) => ({
          ...prevState,
          usePoint: newValue.slice(1),
        }));
        return;
      }
    }

    setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleAddressChange = ({ numAddress, fullAddress }) => {
    setState({
      ...state,
      addrnum: numAddress,
      addr1: fullAddress,
    });
  };

  const handleUseAllPoints = () => {
    const maxUsePoint = orderPrice.totalPrice - orderPrice.totalDiscountPrice;

    setState((prevState) => ({
      ...prevState,
      usePoint: Math.min(orderPrice.point, maxUsePoint),
      buyPrice:
        orderPrice.totalPrice -
        orderPrice.totalDiscountPrice -
        Math.min(orderPrice.point, maxUsePoint),
    }));
  };

  const SettingMyAddress = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/address`)
      .then((res) => {
        const addressData = res.data;

        // addressData가 null 또는 undefined라면 return하여 아무런 state 변경 없이 함수 종료
        if (!addressData) {
          alert("기본 배송지가 없습니다.");
          return;
        }

        const telArray = addressData.tel ? addressData.tel.split("-") : [];
        const phone1 = telArray.length > 0 ? telArray[0] : "010";
        const phone2 = telArray.length > 1 ? telArray[1] : "";
        const phone3 = telArray.length > 2 ? telArray[2] : "";

        setState((prevState) => {
          console.log("Previous State:", prevState);
          console.log("Address Data:", addressData);
          return {
            ...prevState,
            name: addressData.name,
            phone1,
            phone2,
            phone3,
            addr1: addressData.mainAddress,
            addr2: addressData.detAddress,
            addrnum: addressData.zipCode,
          };
        });

        console.log("SettingMyAddress GET ", res);
      })
      .catch((error) => {
        console.error("SettingMyAddress GET Error:", error);
      });
  };

  const OrderSubmit = () => {
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }

    if (state.addr1 === "" || state.addrnum === "") {
      setAddressModalIsOpen(true);
      return;
    }

    const calculatedBuyPrice =
      orderPrice.totalPrice - orderPrice.totalDiscountPrice - state.usePoint;

    console.log({ ...state, buyPrice: calculatedBuyPrice });

    axiosInstance
      .post(`/member/${getCookie("Id")}/payment/first`, {
        name: state.name,
        tel: `${state.phone1}-${state.phone2}-${state.phone3}`,
        mainAddress: state.addr1,
        detAddress: state.addr2,
        zipCode: state.addrnum,
        requestText: state.requestText,
        items: orders,
        totalPrice: orderPrice.totalPrice,
        totalDiscountPrice: orderPrice.totalDiscountPrice,
        usePoint: state.usePoint,
        getPoint: orderPrice.getPoint,
        buyPrice: calculatedBuyPrice,
      })
      .then((res) => {
        const data = res.data;
        console.log("data", data);
        //아임포트 열고 데이터
        openPaymentWindow(data);
        console.log("Order Post ", res);
      })
      .catch((error) => {
        console.error("Order Post Error:", error);
      });
  };

  const openPaymentWindow = (data) => {
    const {
      merchantUid,
      itemName,
      paymentPrice,
      buyerName,
      buyerEmail,
      buyerAddress,
    } = data;

    if (window.IMP) {
      window.IMP.init("imp77557143");

      window.IMP.request_pay(
        {
          pg: "html5_inicis.INIpayTest",
          pay_method: "card",
          merchant_uid: merchantUid,
          name: itemName,
          amount: paymentPrice,
          buyer_email: buyerEmail,
          buyer_name: buyerName,
          buyer_tel: `${state.phone1}-${state.phone2}-${state.phone3}`,
          buyer_addr: buyerAddress,
          buyer_postcode: state.addrnum,
        },
        function (rsp) {
          if (rsp.success) {
            // alert(
            //   "결제가 완료되었습니다. 결제 내역은 마이페이지 > 주문내역에서 확인하실 수 있습니다."
            // );
            axiosInstance
              .post(`/member/${getCookie("Id")}/payment/second`, {
                imp_uid: rsp.imp_uid,
                merchant_uid: rsp.merchant_uid,
              })
              .then((response) => {
                console.log("impUid:", rsp.imp_uid);
                console.log("merchantUid:", rsp.merchant_uid);
                console.log(
                  "Payment request sent successfully:",
                  response.data
                );

                //결제 성공하면 ordercheckinfo창으로 이동
                navigate("/ordercheckinfo", {
                  state: {
                    orderList: orderList,
                    orderState: state,
                  },
                });
              })
              .catch((error) => {
                console.error(
                  "Error occurred while sending payment request:",
                  error
                );
              });
          } else {
            alert("결제에 실패하였습니다.");
          }
        }
      );
    } else {
      //index.html에 따로 스크립트 해야 함.
      console.error("아임포트 라이브러리가 로드되지 않았습니다.");
    }
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      buyPrice:
        orderPrice.totalPrice -
        orderPrice.totalDiscountPrice -
        prevState.usePoint,
    }));
  }, [orderPrice]);

  return (
    <div className="OrderCheck">
      <div className="Cart">
        <Container>
          <h2>주문하기</h2>
          <div className="CartContainer">
            <div className="CartList">
              <div className="input_container">
                <WhiteButton
                  buttonText={"기본 배송지로 설정"}
                  onClick={() => SettingMyAddress()}
                />
                <div className="signup_title">이름</div>
                <input
                  className="input"
                  name="name"
                  value={state.name}
                  onChange={handleChangeState}
                  ref={(el) => (inputRef.current[0] = el)}
                  autoComplete="username"
                />
                <PhoneInput
                  state={state}
                  handleChangeState={handleChangeState}
                  inputRef={inputRef}
                  indexOne={1}
                  indexTwo={2}
                />
                <AddressInput
                  state={state}
                  handleChangeState={handleChangeState}
                  onAddressChange={handleAddressChange}
                  inputRef={inputRef}
                  modalIsOpen={addressModalIsOpen}
                  setModalIsOpen={setAddressModalIsOpen}
                />

                <div className="signup_title">요청사항</div>
                <input
                  className="input"
                  name="requestText"
                  value={state.requestText}
                  onChange={handleChangeState}
                  autoComplete="requestText"
                />
              </div>

              <div className="point_box">
                <div className="between">
                  <div>보유 포인트</div>
                  <div className="content">
                    {orderPrice?.point?.toLocaleString() || 0} P
                  </div>
                </div>
                <div className="between">
                  <div>사용할 포인트</div>
                  <div className="content">
                    <button className="useallbtn" onClick={handleUseAllPoints}>
                      전부 사용
                    </button>
                    <input
                      type="text"
                      name="usePoint"
                      className="pointinput"
                      value={state.usePoint}
                      onChange={handleChangeState}
                    />{" "}
                    P
                  </div>
                </div>
                <div className="between">
                  <div>잔여 포인트</div>
                  <div className="content">
                    {(orderPrice.point - state.usePoint)?.toLocaleString()} P
                  </div>
                </div>
              </div>
              <h3>주문할 상품 목록</h3>
              <OrderList orderList={orderList} orderPrice={orderPrice} />
            </div>

            <OrderBill
              usePonit={state.usePoint}
              buyPrice={
                orderPrice.totalPrice -
                orderPrice.totalDiscountPrice -
                state.usePoint
              }
              orderList={orderPrice}
              onSubmit={OrderSubmit}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OrderCheck;
