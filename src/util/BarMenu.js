import React, { useState } from "react";

import "../styles/MyPage.css";

const BarMenu = ({ menuItems }) => {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0].key); // 기본값을 첫 번째 메뉴로 설정

  return (
    <div className="Review">
      <div className="review_cho">
        <div className="review_content">
          <div className="review_menu">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.key}
                  className={selectedMenu === item.key ? "clicked" : ""}
                  onClick={() => setSelectedMenu(item.key)}
                >
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {menuItems.map(
        (item) =>
          selectedMenu === item.key && (
            <item.component key={item.key} {...item.props} />
          )
      )}
    </div>
  );
};

export default BarMenu;
