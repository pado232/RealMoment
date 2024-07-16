import ItemItem from "../Components/Item/ItemItem";
import { useCallback, useEffect, useState } from "react";
import "../styles/Home.css";
import axiosInstance from "../api/AxiosInstance";
import { getCookie } from "../api/Cookies";
import Pagination from "../util/Pagination";
import Container from "../util/Container";
import usePageTitle from "../hooks/usePageTitle";

const Heart = () => {
  usePageTitle(`HEART`);
  const [wishList, setWishList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchHeartItem = useCallback(() => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/wishList?nowPage=${nowPage}`)
      .then((res) => {
        const wishListdata = res.data.wishList;
        const nowPagedata = res.data.nowPage;
        const totalPagedata = res.data.totalPage;

        setNowPage(nowPagedata);
        setTotalPage(totalPagedata);
        setWishList(wishListdata);

        console.log("fetchHeartItem GET ", res);
      })
      .catch((error) => {
        console.error("fetchHeartItem GET Error:", error);
      });
  }, [nowPage]);

  useEffect(() => {
    fetchHeartItem();
  }, [fetchHeartItem]);

  return (
    <div className="ItemList">
      <Container>
        <h2>하트함</h2>
        <div style={{ marginBottom: 20, fontSize: 16 }}>
          <center>💗를 누르면 하트함에서 상품이 삭제됩니다.</center>
        </div>
        <div className="item_dummy">
          {wishList.length === 0 ? (
            <div>No items found ...</div>
          ) : (
            wishList.map((item, index) => (
              <div key={index}>
                <ItemItem
                  {...item.item}
                  wishId={item.wishId}
                  haertPage={"하트함"}
                  fetchHeartItem={fetchHeartItem}
                />
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
      </Container>
    </div>
  );
};

export default Heart;
