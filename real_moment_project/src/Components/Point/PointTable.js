import "../../styles/OrderListTable.css";

const PointTable = ({ orderList }) => {
  return (
    <div className="ListTable">
      <table>
        <colgroup style={{ width: 700 }} />
        <colgroup style={{ width: 200 }} />

        <thead>
          <tr>
            <th>적립금 내역</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {orderList.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-data">
                <div> 해당 데이터가 없습니다.</div>
              </td>
            </tr>
          ) : (
            orderList.map((order, index) => (
              <tr key={index}>
                <td>
                  {order.orderDetails.map((detail, index) => (
                    <div key={index}></div>
                  ))}
                </td>
                <td>
                  <div>{order.orderedDate.toString().split("T")[0]}</div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default PointTable;
