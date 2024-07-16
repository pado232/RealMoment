import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";

const DetailQuestionMark = () => {
  const [gradeList, setGradeList] = useState([]);

  const fetchGradeList = () => {
    axiosInstance
      .get(`/gradeList`)
      .then((res) => {
        const gradeListData = res.data;
        setGradeList(gradeListData);
        console.log("fetchGradeList GET ", res);
      })
      .catch((error) => {
        console.error("fetchGradeList GET Error:", error);
      });
  };

  useEffect(() => {
    fetchGradeList();
  }, []);

  return (
    <div className="DetailQuestionMark">
      <h3>등급별 적립금</h3>
      <table>
        <colgroup span={3} style={{ width: 200 }} />

        <thead>
          <tr>
            <th>등급</th>
            <th>연간 구매 총액</th>
            <th>적립률</th>
          </tr>
        </thead>
        <tbody>
          {gradeList.map((grade, index) => (
            <tr key={index}>
              <td>{grade.gradeName}</td>
              <td>{grade.gradePrice?.toLocaleString()} 원</td>
              <td>{grade.rewardRate} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailQuestionMark;
