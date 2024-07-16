import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";
import { getCookie } from "../../api/Cookies";

const Membership = () => {
  const [profile, setProfile] = useState({});
  const [gradeList, setGradeList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/profile`)
      .then((res) => {
        const profileData = res.data;
        setProfile(profileData);
        console.log("fetchProfile GET ", res);
      })
      .catch((error) => {
        console.error("fetchProfile GET Error:", error);
      });
  };

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
    const fetchData = async () => {
      await fetchProfile();
      await fetchGradeList();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Membership">
      <h2>멤버십</h2>
      <div className="myinfo">
        <div className="grade">
          {profile.name}님은
          <span className="gradename">{profile.grade?.gradeName}</span> 등급
          입니다.
        </div>
        <div>연간 총 구매 금액</div>
        <div className="totalprice">
          {profile.thisYearPay?.toLocaleString()} 원
        </div>
      </div>

      <table>
        <colgroup style={{ width: 200 }} />
        <colgroup style={{ width: 200 }} />
        <colgroup style={{ width: 100 }} />
        <colgroup style={{ width: 470 }} />
        <thead>
          <tr>
            <th>등급</th>
            <th>연간 구매 총액</th>
            <th>적립률</th>
            <th>나의 적립금과 비교</th>
          </tr>
        </thead>
        <tbody>
          {gradeList.map((grade, index) => (
            <tr
              style={
                grade.gradeName === profile.grade?.gradeName
                  ? { backgroundColor: "#ffecf7" }
                  : {}
              }
              key={index}
            >
              <td>{grade.gradeName}</td>
              <td>{grade.gradePrice?.toLocaleString()} 원</td>
              <td>{grade.rewardRate} %</td>
              <td>
                {grade.gradePrice - profile.thisYearPay > 0 ? (
                  <div>
                    <strong>
                      {(
                        grade.gradePrice - profile.thisYearPay
                      ).toLocaleString()}
                      원
                    </strong>
                    을 더 구매하시면 해당 등급의 적립금 해택을 받을 수 있어요!
                  </div>
                ) : (
                  "❤ 해당 등급까지 왔어요 ❤"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Membership;
