import { LuPencilLine } from "react-icons/lu";
import { LuParkingCircle } from "react-icons/lu";
import { HiOutlineTrophy } from "react-icons/hi2";

import "../styles/UserGrade.css";

const UserGrade = () => {
  const memberIconSize = 10 * 3;
  const name = "홍길동";
  const joinDate = "2020.02.03";
  return (
    <div className="UserGrade">
      <div className="usergrade_content">
        <div className="usergrade_title">
          <img src={process.env.PUBLIC_URL + `/image/user_img.png`} />

          <div className="title_content">
            <p>
              <strong>{name}</strong>님<a href={"/"}>회원정보수정</a>
            </p>
            <p>가입일 : {joinDate}</p>
          </div>
        </div>

        <div className="usergrade_sub">
          <a href={"/"}>
            <div className="icon">
              <HiOutlineTrophy size={memberIconSize} />
            </div>
            <div className="contnet">멤버십</div>
            <div className="numbers" style={{ fontSize: 21 }}>
              웰컴
            </div>
          </a>

          <a href={"/"}>
            <div className="icon">
              <LuParkingCircle size={memberIconSize} />
            </div>
            <div className="contnet">적립금</div>
            <div className="numbers">2340</div>
          </a>

          <a href={"/"}>
            <div className="icon">
              <LuPencilLine size={memberIconSize} />
            </div>
            <div className="contnet">후기 작성</div>
            <div className="numbers">0</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default UserGrade;
