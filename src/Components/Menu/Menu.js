import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import MenuList from "./MenuList";

import "../../styles/Menu.css";

const Menu = () => {
  const iconSize = 9 * 2;
  const [menuHover, setMenuHover] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(""); // 선택된 메뉴 상태

  const location = useLocation();

  const handleMouseEnter = () => {
    setMenuHover(true);
  };

  const handleMouseLeave = () => {
    setMenuHover(false);
  };

  // 현재 URL 경로에 맞춰 선택된 메뉴를 설정
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/item")) {
      setSelectedMenu("Category");
    } else if (path.startsWith("/new")) {
      setSelectedMenu("New");
    } else if (path.startsWith("/sale")) {
      setSelectedMenu("Sale");
    } else if (path.startsWith("/announcement")) {
      setSelectedMenu("Announcement");
    } else {
      setSelectedMenu(""); // 기본값
    }
  }, [location]); // location이 변경될 때마다 실행

  return (
    <div className="Menu">
      <div className="container">
        <ul>
          <div className="menu_main">
            <li>
              <button
                className={`menu-item ${
                  selectedMenu === "Category" ? "selected" : ""
                }`}
                onMouseEnter={handleMouseEnter}
              >
                Category
              </button>
            </li>
            <li>
              <a
                href={"/new"}
                className={`menu-item ${
                  selectedMenu === "New" ? "selected" : ""
                }`}
              >
                New
              </a>
            </li>
            <li>
              <a
                href={"/sale"}
                className={`menu-item ${
                  selectedMenu === "Sale" ? "selected" : ""
                }`}
              >
                Sale
              </a>
            </li>
            <li>
              <a
                href={"/announcement"}
                className={`menu-item ${
                  selectedMenu === "Announcement" ? "selected" : ""
                }`}
              >
                Announcement
              </a>
            </li>

            <li>
              <a
                href={"https://www.instagram.com/"}
                className={`menu-item ${
                  selectedMenu === "Instagram" ? "selected" : ""
                }`}
              >
                <FaInstagram size={iconSize} />
                <span
                  style={{
                    fontSize: 18,
                    marginLeft: 2,
                    verticalAlign: 3,
                  }}
                >
                  RealMoment
                </span>
              </a>
            </li>
          </div>
        </ul>
      </div>
      {menuHover && (
        <div className="menu_list_container" onMouseLeave={handleMouseLeave}>
          <MenuList />
        </div>
      )}
    </div>
  );
};

export default Menu;
