import "../styles/MyFooter.css";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MyFooter = () => {
  return (
    <div className="MyFooter">
      <footer>
        <div className="foot_1">
          <h4>Customer Center</h4>
          <p>042-000-0000</p>
          <p>10:00 - 17:00 (weekday)</p>
          <p style={{ fontSize: "14px" }}>주말 및 공휴일 휴무</p>
        </div>
        <div className="foot_2">
          <h4>Address</h4>
          <p>
            <span style={{ fontSize: "14px" }}>사랑특별시 고백구 행복동 </span>
            1004
          </p>
        </div>
        <div className="foot_3">
          <h4>Notice</h4>
          <p>회원 공지</p>
          <p>회사 소개</p>
          <p>배송 안내</p>
        </div>
        <div className="foot_4">
          <p>© REALMOMENT ALL RIGHTS RESERVED</p>

          <div className="icon_container">
            <div>
              <a href={"https://www.youtube.com/"}>
                <FaYoutube size={30} />
              </a>
            </div>
            <div>
              <a href={"https://www.instagram.com/"}>
                <FaInstagram size={30} />
              </a>
            </div>
            <div>
              <a href={"https://x.com/"}>
                <FaXTwitter size={30} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyFooter;
