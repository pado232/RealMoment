import { useState, useEffect, useCallback } from "react";

import DatePickerSelector from "../../util/DatePickerSelector";
import PeriodSelector from "../../util/PeriodSelector";
import OrderListTable from "../Order/OrderListTable";
import Pagination from "../../util/Pagination";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";

import "../../styles/OrderListTable.css";

const ReviewWrite = ({ MyReviewList }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const [orderList, setOrderList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [itemName, setItemName] = useState("");

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const fetchOrderList = useCallback(() => {
    const queryParams = new URLSearchParams({
      itemName: itemName,
      startDate: startDate.toISOString().split("T")[0],
      lastDate: endDate.toISOString().split("T")[0],
      status: "구매확정",
      nowPage: nowPage,
    });
    const url = `/member/${getCookie(
      "Id"
    )}/orderList?${queryParams.toString()}`;
    console.log("Request URL:", url);

    axiosInstance
      .get(url)
      .then((res) => {
        const orderListdata = res.data.orderList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        setOrderList(orderListdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);

        console.log("OrderList GET ", res);
      })
      .catch((error) => {
        console.error("OrderList GET Error:", error);
      });
  }, [nowPage, startDate, endDate]);

  useEffect(() => {
    fetchOrderList();
  }, [nowPage, startDate, endDate]);

  const handleSearch = () => {
    fetchOrderList();
  };

  const handleRadioChange = (period) => {
    setSelectedPeriod(period);
    const today = new Date();
    const newStartDate = new Date(today);

    // 선택된 기간에 따라 종료일 조정
    switch (period) {
      case "15days":
        newStartDate.setDate(today.getDate() - 15);
        break;
      case "1month":
        newStartDate.setMonth(today.getMonth() - 1);
        break;
      case "2months":
        newStartDate.setMonth(today.getMonth() - 2);
        break;
      case "3months":
        newStartDate.setMonth(today.getMonth() - 3);
        break;
      case "6months":
        newStartDate.setMonth(today.getMonth() - 6);
        break;
      default:
        break;
    }

    setEndDate(new Date());
    setStartDate(newStartDate);
  };

  useEffect(() => {
    handleRadioChange("6months");
  }, []);

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
      <h2 style={{ margin: 50 }}>
        <center>리뷰 작성하기</center>
      </h2>
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
          <div className="select_status"></div>
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
          triggerRefresh={() => {
            fetchOrderList();
            MyReviewList();
          }} // 트리거를 전달
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

export default ReviewWrite;
