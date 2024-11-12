import Container from "../util/Container";
import { useCallback, useEffect, useState } from "react";
import ItemItem from "../Components/Item/ItemItem";
import "../styles/item.css";
import SaleImages from "../Components/Sale/SaleImage";
import axiosInstanceWithoutAuth from "../api/AxioxInstanceWithoutAuth";
import usePageTitle from "../hooks/usePageTitle";

const Sale = () => {
  usePageTitle(`SALE`);
  const [itemList, setItemList] = useState([]);
  const [saleImgs, setSaleImgs] = useState([]);

  const fetchItem = useCallback(() => {
    const queryParams = new URLSearchParams({
      itemName: "",
      nowPage: 1,
      itemSort: "sale",
      categoryId: "",
    });
    console.log("파라미터", queryParams.toString());
    axiosInstanceWithoutAuth
      .get(`/itemList?${queryParams.toString()}`)
      .then((res) => {
        const itemListdata = res.data.itemList;

        const filteredItemListdata = itemListdata.filter(
          (item) => item.discountRate !== 0
        );

        setItemList(filteredItemListdata);
        console.log("fetchItem GET ", res);
      })
      .catch((error) => {
        console.error("fetchItem GET Error:", error);
      });
  }, []);

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
      {saleImgs.length > 0 && <SaleImages saleImgs={saleImgs} />}
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
      </div>
    </Container>
  );
};

export default Sale;
