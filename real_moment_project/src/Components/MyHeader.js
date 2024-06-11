import { IoSearch } from "react-icons/io5";
import { MdOutlineContactPage } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { TbLogin2 } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";

import "../styles/MyHeader.css";
import { useState } from "react";
import { useSearch } from "./Item/SearchProvider";
import { useNavigate } from "react-router-dom";

const MyHeader = ({ isLoggedIn, onLogout }) => {
  const iconSize = 14 * 2;
  const menuIconSize = 14 * 2;
  const navigate = useNavigate();

  const { setSearchTerm } = useSearch();

  const [searchValue, setSearchValue] = useState("");

  const searchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleToggle = () => {
    onLogout();
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchValue.trim() !== "") {
        setSearchTerm(searchValue);
        e.target.blur();
      } else {
        setSearchTerm("");
        e.target.blur(); // 검색어가 빈 값이면 검색을 초기화합니다.
      }
      navigate("/item/all");
    }
  };

  // useEffect = (() => {}, [selectedCategory, selectedCategoryName]);

  return (
    <header className="MyHeader">
      <div className="head_title">
        <h1>
          <a href={"/"}>
            <img
              alt="logo"
              src={process.env.PUBLIC_URL + `/image/RealMonentLogo.png`}
            />
          </a>
        </h1>
      </div>
      <div className="head_search">
        <div className="head_search_box">
          <button>
            <IoSearch size={iconSize} />
          </button>
          <input
            type="text"
            name="search"
            value={searchValue}
            onChange={searchValueChange}
            // onBlur={handleBlur}
            placeholder="찾으시는 상품을 입력해주세요"
            onKeyDown={handleSearch}
          />
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
              <a href={"/cart"}>
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
