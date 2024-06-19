import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../../api/AxiosInstance";
import Pagination from "../../util/Pagination";
import { getCookie } from "../../api/Cookies";

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
    <div className="QandA">
      <h2>적립금 내역</h2>
      <h3>
        <center>나의 적립금 내역</center>
      </h3>
      <div className="QandABox">
        {pointHistory.length === 0 ? (
          <div className="none_review_list"> 적립금이 없습니다.</div>
        ) : (
          pointHistory.map((history, index) => (
            <div className="review_list" key={index}>
              <div className="info_content">
                <div className="info">
                  <div>
                    <strong>{history.pointHistory}</strong>
                  </div>
                  <div>
                    <strong>{history.pointStatus}</strong>
                  </div>
                  <div>
                    <strong>{totalPoint}</strong>
                  </div>
                  <div>작성일자 : {history.time.toString().split("T")[0]}</div>
                </div>
              </div>
            </div>
          ))
        )}
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
