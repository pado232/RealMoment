import { IoSearch } from "react-icons/io5";
import { MdOutlineContactPage } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { TbLogin2 } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";

import "../styles/MyHeader.css";

const MyHeader = ({ isLoggedIn, onLogout }) => {
  const iconSize = 14 * 2;
  const menuIconSize = 14 * 2;

  const handleToggle = () => {
    onLogout();
  };

  return (
    <header className="MyHeader">
      <div className="head_title">
        <h1>
          <a href={"/"}>
            <img
              alt="logo"
              src={process.env.PUBLIC_URL + `/image/RealMoment.PNG`}
            />
          </a>
        </h1>
      </div>
      <div className="head_search">
        <div className="head_search_box">
          <button>
            <IoSearch size={iconSize} />
          </button>
          <input type="text" placeholder="검색어를 입력해주세요" />
        </div>
      </div>
      <div className="head_menu">
        <ul>
          <li>
            {isLoggedIn ? (
              <a href={"/mypage"}>
                <MdOutlineContactPage size={menuIconSize} />
                My_page
              </a>
            ) : (
              ""
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <a href={"/item"}>
                <TiShoppingCart size={menuIconSize} />
                Cart
              </a>
            ) : (
              ""
            )}
          </li>

          <li>
            {isLoggedIn ? (
              <div className="login">
                <a href={"/"} onClick={handleToggle}>
                  <TbLogout2 size={menuIconSize} />
                  Logout
                </a>
              </div>
            ) : (
              <div className="logout">
                <a href={"/login"} onClick={handleToggle}>
                  <TbLogin2 size={menuIconSize} />
                  Login
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MyHeader;
