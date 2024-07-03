import { useEffect, useState } from "react";

import axiosInstance from "../api/AxiosInstance";
import { getCookie } from "../api/Cookies";

import { LuPencilLine } from "react-icons/lu";
import { LuParkingCircle } from "react-icons/lu";
import { HiOutlineTrophy } from "react-icons/hi2";

import "../styles/UserGrade.css";

const UserGrade = ({
  goToPrivacy,
  goToMembership,
  goToPoint,
  goToReview,
  totalReview,
  profileUpdated,
}) => {
  const memberIconSize = 10 * 3;
  const [profile, setProfile] = useState({
    name: "",
    createdDate: "",
    grade: { gradeName: "" },
    point: 0,
  });

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

  useEffect(() => {
    fetchProfile();
  }, [profileUpdated]);

  return (
    <div className="UserGrade">
      <div className="usergrade_content">
        <div className="usergrade_title">
          <img
            src={process.env.PUBLIC_URL + `/imageDummy/user_img.png`}
            alt="User"
          />

          <div className="title_content">
            <p>
              <strong>{profile.name}</strong>님
              <span className="goInfo" onClick={goToPrivacy}>
                회원정보수정
              </span>
            </p>
            <p>가입일 : {profile.createdDate.split("T")[0]}</p>
          </div>
        </div>

        <div className="usergrade_sub">
          <div className="goPoint" onClick={goToMembership}>
            <div className="icon">
              <HiOutlineTrophy size={memberIconSize} />
            </div>
            <div className="contnet">멤버십</div>
            <div className="numbers" style={{ fontSize: 21 }}>
              {profile.grade.gradeName}
            </div>
          </div>

          <div className="goPoint" onClick={goToPoint}>
            <div className="icon">
              <LuParkingCircle size={memberIconSize} />
            </div>
            <div className="contnet">적립금</div>
            <div className="numbers">{profile.point}</div>
          </div>

          <div className="goPoint" onClick={goToReview}>
            <div className="icon">
              <LuPencilLine size={memberIconSize} />
            </div>
            <div className="contnet">후기 작성</div>
            <div className="numbers">{totalReview}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserGrade;
