import { useCategory } from "./CategoryProvider";
import { useSearch } from "../Item/SearchProvider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가

import "../../styles/Menu.css";
import axiosInstanceWithoutAuth from "../../api/AxioxInstanceWithoutAuth";

const MenuList = () => {
  const { setSearchTerm } = useSearch();
  const { handleCategoryChange } = useCategory();
  const [category, setCategory] = useState([]);

  const fetchCategory = () => {
    axiosInstanceWithoutAuth
      .get(`/category`)
      .then((res) => {
        const data = res.data;
        const categorydata = [...data].sort((a, b) => {
          return a.categoryId - b.categoryId;
        });
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

  const handleLinkClick = (categoryId, categoryName) => {
    setSearchTerm("");
    handleCategoryChange(categoryId, categoryName); // 상태 업데이트
  };

  return (
    <div className="MenuList">
      <nav className="category">
        <ul className="category_box">
          <li className="title">
            <Link to={`/item/all`} onClick={() => handleLinkClick("", "전체")}>
              전체
            </Link>
          </li>
          {category.map((item, index) => (
            <li key={index} className="title">
              <Link
                to={`/item/${item.categoryId}`}
                onClick={() => handleLinkClick(item.categoryId, item.name)}
              >
                {item.name}
              </Link>
              {item.child && item.child.length > 0 && (
                <ul className="subcategory">
                  {item.child.map((childItem, index) => (
                    <li key={index}>
                      <Link
                        to={`/item/${childItem.categoryId}`}
                        onClick={() =>
                          handleLinkClick(childItem.categoryId, childItem.name)
                        }
                      >
                        {childItem.name}
                      </Link>
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
