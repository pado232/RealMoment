import axios from "axios";
import ItemItem from "./ItemItem";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../../util/Pagination";
const sortOptionList = [
  { id: 1, value: "new", name: "최신순" },
  { id: 2, value: "sell", name: "판매량순" },
  { id: 3, value: "sale", name: "할인순" },
  { id: 4, value: "low", name: "낮은 가격순" },
  { id: 5, value: "high", name: "높은 가격순" },
];
const ItemList = ({ selectedCategory }) => {
  const [itemList, setItemList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);

  const fetchItem = useCallback(() => {
    const queryParams = new URLSearchParams({
      //   itemName: itemName,
      nowPage: nowPage,
      itemSort: sortOptionList.value,
      categoryId: selectedCategory,
    });

    axios
      .get(`http://localhost:8080/itemList?${queryParams.toString()}`)
      .then((res) => {
        const itemListdata = res.data.ItemList;
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
  }, [nowPage]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem, nowPage]);

  const ControlMenu = () => {
    return (
      <div className="ControlMenu">
        <select>
          {sortOptionList.map((it) => (
            <option key={it.id}>{it.name}</option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="ItemList">
      <ControlMenu />
      <div className="item_dummy">
        {itemList.map((it, index) => (
          <ItemItem key={index} {...it} />
        ))}
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
