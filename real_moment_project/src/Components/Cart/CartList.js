import { useEffect, useState } from "react";
import { getCookie } from "../../api/Cookies";
import axiosInstance from "../../api/AxiosInstance";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const CartList = ({ setOrderList }) => {
  const [cartList, setCartList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchCartList = () => {
    axiosInstance
      .get(`/member/${getCookie("Id")}/cartList`)
      .then((res) => {
        const cartListData = res.data.map((cart) => ({
          ...cart,
          itemCount: cart.count, // 데이터에서 가져온 초기 수량 설정
        }));
        setCartList(cartListData);
        console.log("CartList GET ", res);
      })
      .catch((error) => {
        console.error("CartList GET Error:", error);
      });
  };

  useEffect(() => {
    fetchCartList();
  }, []);

  const fetchCartCount = (cartId, newCount) => {
    axiosInstance
      .patch(`/member/${getCookie("Id")}/cart/count`, {
        cartId: cartId,
        count: newCount,
      })
      .then((res) => {
        console.log("fetchCartCount Patch ", res);
      })
      .catch((error) => {
        console.error("fetchCartCount Patch Error:", error);
      });
  };

  const fetchCartRemove = (cartId) => {
    return axiosInstance
      .delete(`/member/${getCookie("Id")}/cart?cartId=${cartId}`)
      .then((res) => {
        console.log("fetchCartRemove Delete ", res);
      })
      .catch((error) => {
        console.error("fetchCartRemove Delete Error:", error);
      });
  };

  const updateItemCount = (index, newCount, cartId) => {
    const updatedCartList = cartList.map((cart, idx) => {
      if (idx === index) {
        return {
          ...cart,
          itemCount: newCount,
        };
      }
      return cart;
    });
    setCartList(updatedCartList);
    fetchCartCount(cartId, newCount);

    // Update order list when item count changes
    const updatedSelectedItems = selectedItems.map((id) => {
      const item = updatedCartList.find((cart) => cart.cartId === id);
      return {
        itemId: item.item.itemId,
        count: item.itemCount,
        sellPrice: item.item.sellPrice,
        stock: item.item.stock,
      };
    });

    setOrderList(updatedSelectedItems);
  };

  const minusClick = (index, cartId) => {
    const currentItem = cartList[index];

    if (currentItem.itemCount > 1) {
      updateItemCount(index, currentItem.itemCount - 1, cartId);
    }
  };

  const plusClick = (index, cartId) => {
    const currentItem = cartList[index];

    if (currentItem.itemCount < 10) {
      console.log("수량", currentItem.item.stock);
      if (currentItem.item.stock > currentItem.itemCount) {
        updateItemCount(index, currentItem.itemCount + 1, cartId);
      }
    }
  };

  const handleCheckboxChange = (index, cartId) => {
    const updatedSelectedItems = selectedItems.includes(cartId)
      ? selectedItems.filter((id) => id !== cartId)
      : [...selectedItems, cartId];

    setSelectedItems(updatedSelectedItems);

    const selectedItemsData = updatedSelectedItems.map((id) => {
      const item = cartList.find((cart) => cart.cartId === id);
      return {
        itemId: item.item.itemId,
        count: item.itemCount,
        sellPrice: item.item.sellPrice,
        stock: item.item.stock,
      };
    });

    setOrderList(selectedItemsData);
  };

  const deleteSelectedItems = () => {
    const deletePromises = selectedItems.map((cartId) =>
      fetchCartRemove(cartId)
    );
    Promise.all(deletePromises)
      .then(() => {
        const updatedCartList = cartList.filter(
          (cart) => !selectedItems.includes(cart.cartId)
        );
        setCartList(updatedCartList);
        setSelectedItems([]);
        setOrderList([]);
      })
      .catch((error) => {
        console.error("Error deleting selected items:", error);
      });
  };

  return (
    <div className="CartList">
      <div className="check_bar">
        <div>
          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  const allItems = cartList.map((cart) => cart.cartId);
                  setSelectedItems(allItems);
                  setOrderList(
                    cartList.map((cart) => ({
                      itemId: cart.item.itemId,
                      count: cart.itemCount,
                      sellPrice: cart.item.sellPrice,
                      stock: cart.item.stock,
                    }))
                  );
                } else {
                  setSelectedItems([]);
                  setOrderList([]);
                }
              }}
              checked={selectedItems.length === cartList.length}
            />
            전체 선택
          </label>
        </div>
        <div>
          <button onClick={deleteSelectedItems}>선택상품 삭제</button>
        </div>
      </div>

      {cartList.length === 0 ? (
        <div className="none_cart_list">장바구니에 담긴 상품이 없습니다.</div>
      ) : (
        cartList.map((cart, index) => (
          <div className="cart_list" key={index}>
            <div className="img">
              <div className="checkbox_conta">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(cart.cartId)}
                  onChange={() => handleCheckboxChange(index, cart.cartId)}
                />
              </div>
              {cart.item.sell ? (
                <a href={`/detail/${cart.item.itemId}`}>
                  <div
                    className={`img ${
                      cart.item.stock === 0 || cart.item.sell === false
                        ? "stock-overlay"
                        : ""
                    }`}
                  >
                    {cart.item.stock === 0 && (
                      <div className="stock-text">SOLD OUT</div>
                    )}
                    <img
                      alt={`${cart.item.name} 이미지`}
                      src={cart.item.mainImg}
                    />
                  </div>
                </a>
              ) : (
                <div
                  className={`img ${
                    cart.item.stock === 0 || cart.item.sell === false
                      ? "stock-overlay"
                      : ""
                  }`}
                >
                  {cart.item.stock === 0 && (
                    <div className="stock-text">SOLD OUT</div>
                  )}
                  <img
                    alt={`${cart.item.name} 이미지`}
                    src={cart.item.mainImg}
                  />
                </div>
              )}
            </div>
            <div className="info_content">
              <div className="title">
                <div>{cart.item.name}</div>
              </div>
              {cart.item.discountRate !== 0 ? (
                <div className="info">
                  <div className="price">
                    {cart.item.price.toLocaleString()}원
                  </div>
                  <div className="discountRate">{cart.item.discountRate}%</div>
                  <div className="discountPrice">
                    -{cart.item.discountPrice.toLocaleString()}원
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="info_price">
                <div>{cart.item.sellPrice.toLocaleString()} 원</div>
              </div>
            </div>
            <div className="count_box">
              {cart.item.stock < 10 && cart.item.stock > 0 ? (
                <div className="stock">
                  <span>🔥 품절 임박</span>(남은 수량:{" "}
                  <strong>{cart.item.stock}</strong>) 🔥
                </div>
              ) : (
                ""
              )}

              <div className="count">
                <div className="counter">
                  <button onClick={() => minusClick(index, cart.cartId)}>
                    <FaMinus size={11} />
                  </button>
                  <input
                    type="text"
                    name="itemCount"
                    value={cart.itemCount}
                    readOnly
                  />
                  <button onClick={() => plusClick(index, cart.cartId)}>
                    <FaPlus size={12} />
                  </button>
                </div>
                <div className="totalPrice">
                  {(cart.item.sellPrice * cart.itemCount).toLocaleString()} 원
                </div>
              </div>
              {cart.itemCount >= 10 && (
                <div
                  style={{
                    marginTop: 10,
                    border: "none",
                    color: "rgb(220, 0, 0)",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                  className="warning-message"
                >
                  10개 이상의 상품을 구매하실 수 없습니다.
                </div>
              )}
              {cart.item.stock === cart.itemCount && (
                <div
                  style={{
                    marginTop: 10,
                    border: "none",
                    color: "rgb(220, 0, 0)",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                  className="warning-message"
                >
                  남은 재고의 최대 수량입니다.
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartList;
