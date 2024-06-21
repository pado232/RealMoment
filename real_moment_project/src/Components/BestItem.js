import ItemItem from "./Item/ItemItem";
import { useEffect, useState } from "react";
import "../styles/Home.css";

import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";

const BestItem = () => {
  const [itemList, setItemList] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

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

  const fetchItem = (categoryId = "") => {
    const queryParams = new URLSearchParams({
      itemName: "",
      nowPage: 1,
      itemSort: "sell",
      categoryId: categoryId,
    });
    console.log("파라미터", queryParams.toString());
    axiosInstanceWithoutAuth
      .get(`/itemList?${queryParams.toString()}`)
      .then((res) => {
        // 가장 앞의 3개 아이템만 추출
        const itemListdata = res.data.itemList.slice(0, 4);

        setItemList(itemListdata);
        console.log("fetchItem GET ", res);
      })
      .catch((error) => {
        console.error("fetchItem GET Error:", error);
      });
  };

  useEffect(() => {
    fetchItem(selectedCategoryId);
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="BestItem">
      <div className="categoryBtn">
        <ul>
          <li className="title">
            <button
              className={selectedCategoryId === "" ? "selected" : ""}
              onClick={() => handleCategoryClick("")}
            >
              전체
            </button>
          </li>
          {category.map((item, index) => (
            <li key={index} className="title">
              <button
                className={
                  selectedCategoryId === item.categoryId ? "selected" : ""
                }
                onClick={() => handleCategoryClick(item.categoryId)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="item_dummy">
        {itemList.length === 0 ? (
          <div>No items found ...</div>
        ) : (
          itemList.map((item, index) => (
            <div key={index}>
              <ItemItem key={index} {...item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BestItem;
