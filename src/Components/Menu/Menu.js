import { useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import MenuList from "./MenuList";

import "../../styles/Menu.css";

const Menu = () => {
  const iconSize = 9 * 2;
  const [menuHover, setMenuHover] = useState(false);

  const handleMouseEnter = () => {
    setMenuHover(true);
  };

  const handleMouseLeave = () => {
    setMenuHover(false);
  };

  return (
    <div className="Menu">
      <div className="container">
        <ul>
          <div className="menu_main">
            <li>
              <button
                className={menuHover ? "hover" : ""}
                onMouseEnter={handleMouseEnter}
              >
                Category
              </button>
            </li>
            <li>
              <a href={"/new"}>New</a>
            </li>
            <li>
              <a href={"/sale"}>Sale</a>
            </li>
            <li>
              <a href={"https://www.instagram.com/"}>
                <FaInstagram size={iconSize} />
                <span style={{ fontSize: 22, marginLeft: 2 }}>RealMoment</span>
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
