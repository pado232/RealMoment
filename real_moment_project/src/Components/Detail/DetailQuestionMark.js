const DetailQuestionMark = () => {
  return (
    <div className="DetailQuestionMark">
      <h3>등급별 적립금</h3>
      <table>
        <colgroup style={{ width: 200 }} />
        <colgroup style={{ width: 200 }} />
        <colgroup style={{ width: 200 }} />
        <thead>
          <tr>
            <th>등급</th>
            <th>연간 구매 총액</th>
            <th>적립률</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>white</td>
            <td>100,000</td>
            <td>1%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailQuestionMark;
