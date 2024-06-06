import axios from "axios";
import ItemItem from "./ItemItem";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../util/Pagination";
import { useSearch } from "./SearchProvider";
import { useCategory } from "../Menu/CategoryProvider";
const sortOptionList = [
  { id: 1, value: "new", name: "최신순" },
  { id: 2, value: "sell", name: "판매량순" },
  { id: 3, value: "sale", name: "할인순" },
  { id: 4, value: "low", name: "낮은 가격순" },
  { id: 5, value: "high", name: "높은 가격순" },
];
const ItemList = () => {
  const { selectedCategory, selectedCategoryName, handleCategoryChange } =
    useCategory();
  const { searchTerm } = useSearch();

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
    console.log("파라미터", queryParams.toString());
    axios
      .get(`http://localhost:8080/itemList?${queryParams.toString()}`)
      .then((res) => {
        const itemListdata = res.data.itemList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        setItemList(itemListdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);
        console.log("fetchItem GET ", res);
      })
      .catch((error) => {
        console.error("fetchItem GET Error:", error);
      });
  }, [nowPage, selectedCategory, sortOption, searchTerm]);

  useEffect(() => {
    handleCategoryChange("", "전체");
  }, [searchTerm]);

  useEffect(() => {
    setNowPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const ControlMenu = () => {
    return (
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
  };

  return (
    <div className="ItemList">
      <h2>{selectedCategoryName}</h2>
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

// // ItemList의 기본값을 빈 배열로 설정
// ItemList.defaultProps = {
//   itemList: [],
// };

export default ItemList;
