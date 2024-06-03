import { useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import MenuList from "./MenuList";

import "../../styles/Menu.css";

const Menu = () => {
  const iconSize = 9 * 2;
  const [menuClick, setMenuClick] = useState(false);
  const menuToggle = () => {
    setMenuClick(!menuClick);
  };
  return (
    <div className="Menu">
      <div className="containor">
        <ul>
          <div className="menu_main">
            <li>
              <button className={menuClick ? "click" : ""} onClick={menuToggle}>
                Category
              </button>
            </li>
            <li>
              <a href={"/new"}>New</a>
            </li>
            <li>
              <a href={"/item"}>Sale</a>
            </li>
            <li>
              <a href={"https://www.instagram.com/"}>
                <FaInstagram size={iconSize} />
                <span>RealMoment</span>
              </a>
            </li>
          </div>
        </ul>
      </div>
      {/* {menuClick ? <MenuList /> : ""} */}
      <MenuList />
    </div>
  );
};

export default Menu;
