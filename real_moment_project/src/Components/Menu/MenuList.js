import { useCategory } from "./CategoryProvider";
import { useEffect, useState } from "react";
import axios from "axios";

import "../../styles/Menu.css";

const MenuList = () => {
  const { handleCategoryChange } = useCategory();
  const [category, setCategory] = useState([]);

  const fetchCategory = () => {
    axios
      .get(`http://localhost:8080/category`)
      .then((res) => {
        const categorydata = res.data;
        setCategory(categorydata);
        console.log("Category GET ", res);
      })
      .catch((error) => {
        console.error("Category GET Error:", error);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleLinkClick = (event, categoryId, categoryName) => {
    event.preventDefault(); // 링크 클릭 시 페이지 리로드 방지
    handleCategoryChange(categoryId, categoryName); // 상태 업데이트
  };

  return (
    <div className="MenuList">
      <nav className="category">
        <ul className="skincare">
          {category.map((item, index) => (
            <li key={index} className="title">
              <a
                href={`/item/${item.categoryId}`}
                onClick={(e) => handleLinkClick(e, item.categoryId, item.name)}
              >
                {item.name}
              </a>
              {item.child && item.child.length > 0 && (
                <ul>
                  {item.child.map((childItem, index) => (
                    <li key={index}>
                      <a
                        href={`/item/${childItem.categoryId}`}
                        onClick={(e) =>
                          handleLinkClick(
                            e,
                            childItem.categoryId,
                            childItem.name
                          )
                        }
                      >
                        {childItem.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MenuList;
