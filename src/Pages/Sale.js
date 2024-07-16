import Container from "../util/Container";
import { useCallback, useEffect, useState } from "react";
import Pagination from "../util/Pagination";
import ItemItem from "../Components/Item/ItemItem";
import "../styles/item.css";
import SaleImages from "../Components/Sale/SaleImage";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";
import usePageTitle from "../hooks/usePageTitle";

const Sale = () => {
  usePageTitle(`SALE`);
  const [itemList, setItemList] = useState([]);
  const [saleImgs, setSaleImgs] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [nowPage, setNowPage] = useState(1);

  const fetchItem = useCallback(() => {
    const queryParams = new URLSearchParams({
      itemName: "",
      nowPage: nowPage,
      itemSort: "sale",
      categoryId: "",
    });
    console.log("파라미터", queryParams.toString());
    axiosInstanceWithoutAuth
      .get(`/itemList?${queryParams.toString()}`)
      .then((res) => {
        const itemListdata = res.data.itemList;
        const totalPagedata = res.data.totalPage;
        const nowPagedata = res.data.nowPage;

        const filteredItemListdata = itemListdata.filter(
          (item) => item.discountRate !== 0
        );

        setItemList(filteredItemListdata);
        setTotalPage(totalPagedata);
        setNowPage(nowPagedata);
        console.log("fetchItem GET ", res);
      })
      .catch((error) => {
        console.error("fetchItem GET Error:", error);
      });
  }, [nowPage]);

  const fetchSaleImgs = () => {
    const param = "세일";
    axiosInstanceWithoutAuth
      .get(`/image?imageLocation=${param}`)
      .then((res) => {
        const imgData = res.data.imageListResponse;
        const filteredImgs = imgData.filter((img) => img.show);
        setSaleImgs(filteredImgs);
        console.log("fetchSaleImgs GET", res);
      })
      .catch((error) => {
        console.log("fetchSaleImgs Error", error);
      });
  };

  useEffect(() => {
    fetchSaleImgs();
  }, []);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return (
    <Container>
      <h2>SALE</h2>
      {saleImgs.length < 0 && <SaleImages saleImgs={saleImgs} />}

      <div className="ItemList">
        <div className="item_dummy">
          {itemList.length === 0 ? (
            <div>No items found ...</div>
          ) : (
            itemList.map((item, index) => (
              <div key={index}>
                <ItemItem {...item} />
              </div>
            ))
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
    </Container>
  );
};

export default Sale;
