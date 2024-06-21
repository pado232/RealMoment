import { useEffect, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../../api/AxiosInstance";
import Pagination from "../../util/Pagination";
import { getCookie } from "../../api/Cookies";
import PointTable from "./PointTable";

Modal.setAppElement("#root");

const Point = () => {
  const [pointHistory, setPointHistoryData] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [totalPoint, setTotalPoint] = useState("");

  const fetchPointHistory = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/point?nowPage=${nowPage}`)
      .then((res) => {
        const pointHistoryData = res.data.pointHistoryResponses;
        const nowPageData = res.data.nowPage;
        const totalPageData = res.data.totalPage;
        const totalPointData = res.data.totalPoint;

        setPointHistoryData(pointHistoryData);
        setNowPage(nowPageData);
        setTotalPage(totalPageData);
        setTotalPoint(totalPointData);

        console.log("fetchPointHistory GET ", res);
      })
      .catch((error) => {
        console.error("fetchPointHistory GET Error:", error);
      });
  };

  useEffect(() => {
    fetchPointHistory();
  }, [nowPage]);

  return (
    <div className="Point">
      <h2>적립금 내역</h2>
      <h3>
        <center>나의 적립금 내역</center>
      </h3>
      <div className="total_point">
        MY POINT : <strong>{totalPoint} P</strong>{" "}
      </div>

      <div>
        <PointTable pointHistory={pointHistory} />
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

export default Point;
