import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { VscChevronLeft } from "react-icons/vsc";

import "../styles/LoginHeader.css";

const LoginHeader = ({ titleText }) => {
  const navigate = useNavigate();
  const backIconSize = 15 * 3;
  const homeIconSize = 12 * 3;

  return (
    <header className="LoginHeader">
      <div className="login_back">
        <button onClick={() => navigate(-1)}>
          <VscChevronLeft size={backIconSize} />
        </button>
      </div>
      <div className="login_title">
        <h2>{titleText}</h2>
      </div>
      <div className="login_home">
        <a href={"/"}>
          <IoHomeOutline size={homeIconSize} style={{ color: "black" }} />
        </a>
      </div>
    </header>
  );
};

export default LoginHeader;
