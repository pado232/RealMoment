import React from "react";
import { Link } from "react-router-dom";
import { useCategory } from "./CategoryProvider";
import { useSearch } from "../Item/SearchProvider";
import "../../styles/Menu.css";

const MenuList = () => {
  const { setSearchTerm } = useSearch();
  const { handleCategoryChange, categories } = useCategory();

  const handleLinkClick = (categoryId, categoryName) => {
    setSearchTerm("");
    handleCategoryChange(categoryId, categoryName);
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
          {categories.map((item, index) => (
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
