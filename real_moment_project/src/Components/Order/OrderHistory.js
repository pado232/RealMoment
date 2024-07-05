import { useState, useEffect, useCallback } from "react";
import DatePickerSelector from "../../util/DatePickerSelector";
import PeriodSelector from "../../util/PeriodSelector";
import OrderListTable from "./OrderListTable";
import Pagination from "../../util/Pagination";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";
import "../../styles/OrderListTable.css";

const OrderHistory = ({
  setProfileUpdated,
  profileUpdated,
  MyReviewList,
  reviewCountUpdated,
  setReviewCountUpdated,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const [orderList, setOrderList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [itemName, setItemName] = useState("");
  const [status, setStatus] = useState("");

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const fetchOrderList = useCallback(() => {
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const queryParams = new URLSearchParams({
      itemName: itemName,
      startDate: formatDate(startDate),
      lastDate: formatDate(endDate),
      status: status,
      nowPage: nowPage,
    });
    const url = `/member/${getCookie(
      "Id"
    )}/orderList?${queryParams.toString()}`;

    axiosInstance
      .get(url)
      .then((res) => {
        const orderListdata = res.data.orderList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        setOrderList(orderListdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);

        console.log("fetchOrderList GET ", res);
      })
      .catch((error) => {
        console.error("fetchOrderList GET Error:", error);
      });
  }, [nowPage, status, startDate, endDate, itemName]);

  useEffect(() => {
    // 초기 6개월 전 날짜 설정
    const newStartDate = new Date();
    newStartDate.setMonth(newStartDate.getMonth() - 6);
    setStartDate(newStartDate);
    setEndDate(new Date());
    setSelectedPeriod("6months");
  }, []);

  useEffect(() => {
    fetchOrderList();
  }, [startDate, endDate, selectedPeriod]);

  const handleSearch = () => {
    fetchOrderList();
  };

  const handleRadioChange = (period) => {
    setSelectedPeriod(period);
    const newStartDate = new Date();

    // 선택된 기간에 따라 시작일 조정
    switch (period) {
      case "15days":
        newStartDate.setDate(newStartDate.getDate() - 15);
        break;
      case "1month":
        newStartDate.setMonth(newStartDate.getMonth() - 1);
        break;
      case "2months":
        newStartDate.setMonth(newStartDate.getMonth() - 2);
        break;
      case "3months":
        newStartDate.setMonth(newStartDate.getMonth() - 3);
        break;
      case "6months":
        newStartDate.setMonth(newStartDate.getMonth() - 6);
        break;
      default:
        break;
    }

    setEndDate(new Date());
    setStartDate(newStartDate);

    // 상태가 업데이트된 후에 데이터를 가져옵니다.
    fetchOrderList();
  };

  const handleSearchSubmit = () => {
    // 서버에 startDate와 endDate를 전달하면 됩니다.
    console.log("상품명:", itemName);
    fetchOrderList();
    setItemName("");
  };

  const handleSearchCancelSubmit = () => {
    // 서버에 startDate와 endDate를 전달하면 됩니다.
    setItemName("");
    console.log("상품명:", itemName);
    fetchOrderList();
  };

  return (
    <div className="OrderHistory">
      <h2 className="mypage_all_h2">주문내역</h2>
      <div className="orderhistory_content">
        <div className="lookup_box">
          <DatePickerSelector
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            handleSearch={handleSearch}
          />
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            handleRadioChange={handleRadioChange}
          />
        </div>
        <div className="select_box">
          <div className="select_status">
            <select
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                console.log(status);
              }}
            >
              <option value={""}>전체 상태</option>
              <option value={"결제준비"}>결제 준비</option>
              <option value={"결제완료"}>결제 완료</option>
              <option value={"배송준비"}>배송 준비</option>
              <option value={"배송중"}>배송 중</option>
              <option value={"배송완료"}>배송 완료</option>
              <option value={"결제취소"}>결제 취소</option>
              <option value={"환불요청"}>환불 요청</option>
              <option value={"환불완료"}>환불 완료</option>
              <option value={"구매확정"}>구매 확정</option>
            </select>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="상품명 검색"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <button className="btn" onClick={handleSearchSubmit}>
              검색
            </button>
            <button className="btn" onClick={handleSearchCancelSubmit}>
              취소
            </button>
          </div>
        </div>

        <OrderListTable
          orderList={orderList}
          isWriteModalOpen={isWriteModalOpen}
          setIsWriteModalOpen={setIsWriteModalOpen}
          fetchOrderList={fetchOrderList}
          triggerRefresh={() => {
            MyReviewList();
          }} // 트리거를 전달
          profileUpdated={profileUpdated}
          setProfileUpdated={setProfileUpdated}
          reviewCountUpdated={reviewCountUpdated}
          setReviewCountUpdated={setReviewCountUpdated}
        />
      </div>
      <div className="pagination">
        <Pagination
          setNowPage={setNowPage}
          nowPage={nowPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
