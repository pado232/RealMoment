import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCategory } from "../Menu/CategoryProvider";
import { useSearch } from "./SearchProvider";
import axiosInstanceWithoutAuth from "../../api/AxioxInstanceWithoutAuth";
import ItemItem from "./ItemItem";
import Pagination from "../../util/Pagination";
import usePageTitle from "../../hooks/usePageTitle";

const sortOptionList = [
  { id: 1, value: "new", name: "최신순" },
  { id: 2, value: "sell", name: "판매량순" },
  { id: 3, value: "sale", name: "할인순" },
  { id: 4, value: "low", name: "낮은 가격순" },
  { id: 5, value: "high", name: "높은 가격순" },
];

const ItemList = () => {
  const {
    selectedCategory,
    selectedCategoryName,
    handleCategoryChange,
    categories,
  } = useCategory();
  const { searchTerm } = useSearch();
  const { categoryId } = useParams();
  usePageTitle(
    `${selectedCategoryName === "전체" ? "" : selectedCategoryName} 제품 전체`
  );

  const [itemList, setItemList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);
  const [sortOption, setSortOption] = useState(sortOptionList[0].value);

  const fetchItem = useCallback(() => {
    const queryParams = new URLSearchParams({
      itemName: searchTerm,
      nowPage: nowPage,
      itemSort: sortOption,
      categoryId: selectedCategory,
    });

    axiosInstanceWithoutAuth
      .get(`/itemList?${queryParams.toString()}`)
      .then((res) => {
        const itemListdata = res.data.itemList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        setItemList(itemListdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);
      })
      .catch((error) => {
        console.error("fetchItem GET Error:", error);
      });
  }, [nowPage, selectedCategory, sortOption, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      handleCategoryChange("", "검색");
    }
    fetchItem();
  }, [fetchItem, searchTerm, handleCategoryChange]);

  // 페이지가 변경될 때마다 상단으로 스크롤
  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 상단으로 스크롤
  }, [nowPage]);

  useEffect(() => {
    setNowPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    const findCategory = (categories, id) => {
      for (let category of categories) {
        if (category.categoryId === parseInt(id)) {
          return category;
        }
        if (category.child) {
          const found = findCategory(category.child, id);
          if (found) {
            return found;
          }
        }
      }
      return null;
    };

    if (categoryId && categories.length > 0) {
      if (categoryId === "all") {
        // handleCategoryChange("", "전체");
      } else {
        const selectedCategory = findCategory(categories, categoryId);
        if (selectedCategory) {
          handleCategoryChange(
            selectedCategory.categoryId,
            selectedCategory.name
          );
        } else {
          console.error("CategoryId 없음:", categoryId);
        }
      }
    }
  }, [categoryId, categories, handleCategoryChange]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const ControlMenu = () => (
    <div className="ControlMenu">
      <select value={sortOption} onChange={handleSortChange}>
        {sortOptionList.map((it) => (
          <option key={it.id} value={it.value}>
            {it.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="ItemList">
      {selectedCategoryName === "" ? (
        <h2>전체</h2>
      ) : selectedCategoryName === "검색" ? (
        <h2></h2>
      ) : (
        <h2>{selectedCategoryName}</h2>
      )}
      {searchTerm && (
        <div style={{ fontSize: 20, padding: 40 }}>
          <center>
            <strong>'{searchTerm}'</strong>에 대한 검색결과 입니다.
          </center>
        </div>
      )}

      <ControlMenu />
      <div className="item_dummy">
        {itemList.length === 0 ? (
          <div>No items found ...</div>
        ) : (
          itemList.map((item, index) => <ItemItem key={index} {...item} />)
        )}
      </div>
      <div className="pagination">
        <Pagination
          setNowPage={setNowPage}
          nowPage={nowPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default ItemList;
