import React, { useRef, useEffect, useState, useCallback } from "react";
import DeliveryForm from "../Delivery/DeliveryForm";
import ModalContainer from "../../util/ModalContainer";
import DeliveryTable from "../Delivery/DeliveryTable";
import Pagination from "../../util/Pagination";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import { HiOutlineHome } from "react-icons/hi";
import { LuBuilding2 } from "react-icons/lu";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "../../styles/Delivery.css";

const Delivery = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deliveries, setDeliveries] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [editingDelivery, setEditingDelivery] = useState(null); // 수정할 데이터를 위한 상태

  const DeliveryAddressList = useCallback(() => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/addressList?nowPage=${nowPage}`)
      .then((res) => {
        const addressListdata = res.data.addressList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        setDeliveries(addressListdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);

        console.log("DeliveryAddressList GET ", res);
      })
      .catch((error) => {
        console.error("DeliveryAddressList GET Error:", error);
      });
  }, [nowPage]);

  useEffect(() => {
    DeliveryAddressList();
  }, [nowPage, DeliveryAddressList]);

  const customStyles = {
    content: {
      top: "55%",
      left: "52%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  };

  const iconData = [
    { value: "집", iconcom: HiOutlineHome },
    { value: "회사", iconcom: LuBuilding2 },
    { value: "기타", iconcom: HiOutlineLocationMarker },
  ];

  const inputRef = useRef([]);
  const initialState = {
    icon: "",
    iconcom: null,
    recipient: "",
    addrnum: "",
    addr1: "",
    addr2: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    default: false,
  };
  const [state, setState] = useState(initialState);

  /** AddressInput에서 가져오는 값 */
  const handleAddressChange = ({ numAddress, fullAddress }) => {
    // 상위 컴포넌트의 상태 업데이트
    setState({
      ...state,
      addrnum: numAddress,
      addr1: fullAddress,
    });
  };

  /** state 유효성 검사 */
  const handleChangeState = (e) => {
    const { name, value } = e.target;

    if ((name === "phone2" || name === "phone3") && isNaN(value)) {
      // 입력값이 숫자가 아닌 경우 무시
      return;
    }

    const selectedIcon = iconData.find((item) => item.value === value);
    if (name === "icon" && selectedIcon) {
      setState({
        ...state,
        icon: value,
        iconcom: selectedIcon.iconcom,
      });
      return;
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  /** 배송지 추가 버튼이 눌렸을 때 실행되어야할  */
  const handleCreate = () => {
    if (state.icon === "") {
      alert("배송지 별칭을 선택해주세요.");
      return;
    }
    // if문들은 유효성 검사
    for (let i = 1; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value === "") {
        inputRef.current[i].focus();
        return;
      }
    }

    if (state.addrnum === "") {
      alert("주소를 선택해주세요.");
      return;
    }

    axiosInstance
      .post(`/member/${getCookie("Id")}/address`, {
        location: state.icon,
        name: state.recipient,
        tel: `${state.phone1}-${state.phone2}-${state.phone3}`,
        zipCode: state.addrnum,
        mainAddress: state.addr1,
        detAddress: state.addr2,
        default: state.default,
      })
      .then((res) => {
        setModalIsOpen(false);
        console.log("DeliveryAddressCreate POST ", res);
        DeliveryAddressList(); // 데이터 새로고침
      })
      .catch((error) => {
        console.error("DeliveryAddressCreate POST Error:", error);
      });
  };

  const handleEdit = (addressId) => {
    axiosInstance
      .patch(`/member/${getCookie("Id")}/address`, {
        addressId: addressId,
        location: state.icon,
        name: state.recipient,
        tel: `${state.phone1}-${state.phone2}-${state.phone3}`,
        zipCode: state.addrnum,
        mainAddress: state.addr1,
        detAddress: state.addr2,
        default: state.default,
      })
      .then((res) => {
        setModalIsOpen(false);
        console.log("DeliveryAddressUpdate PATCH ", res);
        DeliveryAddressList(); // 데이터 새로고침
      })
      .catch((error) => {
        console.error("DeliveryAddressUpdate PATCH Error:", error);
      });
  };

  const openModalForEdit = (delivery) => {
    setState({
      icon: delivery.location || "",
      iconcom: delivery.iconcom || null,
      recipient: delivery.name,
      addrnum: delivery.zipCode || "",
      addr1: delivery.mainAddress,
      addr2: delivery.detAddress,
      phone1: delivery.tel.split("-")[0],
      phone2: delivery.tel.split("-")[1],
      phone3: delivery.tel.split("-")[2],
      default: delivery.default,
    });
    setEditingDelivery(delivery);
    setModalIsOpen(true);
  };
  const defaultSetting = () => {
    setState({ ...state, default: true });
  };

  return (
    <div className="Delivery">
      <h2 className="mypage_all_h2">배송지 관리</h2>
      <div className="delivery-content">
        <div className="button_add">
          <button
            onClick={() => {
              setModalIsOpen(true);
              setState(initialState); // 새 배송지 추가를 위한 초기화
              setEditingDelivery(null);
            }}
          >
            배송지 추가
          </button>
        </div>

        <ModalContainer
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          customStyles={customStyles}
        >
          <DeliveryForm
            state={state}
            deliveries={editingDelivery}
            setModalIsOpen={setModalIsOpen}
            inputRef={inputRef}
            handleAddressChange={handleAddressChange}
            handleChangeState={handleChangeState}
            indexOne={5}
            indexTwo={6}
            handleSubmit={
              editingDelivery
                ? () => handleEdit(editingDelivery.addressId)
                : handleCreate
            }
            iconData={iconData}
            defaultSetting={defaultSetting}
          />
        </ModalContainer>

        <DeliveryTable
          deliveries={deliveries}
          openModalForEdit={openModalForEdit}
        />
        <div className="pagination">
          <Pagination
            setNowPage={setNowPage}
            nowPage={nowPage}
            totalPage={totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
