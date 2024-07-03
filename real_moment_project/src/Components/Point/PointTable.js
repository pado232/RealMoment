import "../../styles/OrderListTable.css";
import DateFormat from "../../util/DateFormat";

const PointTable = ({ pointHistory }) => {
  return (
    <div className="PonitTable">
      <div className="ListTable">
        <table className="Point">
          <colgroup style={{ width: 400 }} />
          <colgroup style={{ width: 700 }} />

          <colgroup style={{ width: 400 }} />
          <thead>
            <tr>
              <th>적립금</th>
              <th>적립 사항</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {pointHistory.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">
                  <div> 해당 데이터가 없습니다.</div>
                </td>
              </tr>
            ) : (
              pointHistory.map((history, index) => (
                <tr key={index}>
                  <td>
                    <div>{history.pointHistory} P</div>
                  </td>
                  <td>
                    <strong>
                      <div>{history.pointStatus}</div>
                    </strong>
                  </td>
                  <td>
                    <div className="date">
                      <DateFormat dateString={history.time} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PointTable;
