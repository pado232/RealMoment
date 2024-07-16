import Container from "../util/Container";

import "../styles/Cart.css";
import CartList from "../Components/Cart/CartList";
import Bill from "../Components/Cart/Bill";
import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";

const Cart = () => {
  usePageTitle(`CART`);
  const [orderList, setOrderList] = useState([]);

  return (
    <div className="Cart">
      <Container>
        <h2>장바구니</h2>
        <div className="CartContainer">
          <CartList setOrderList={setOrderList} />
          <Bill orderList={orderList} />
        </div>
      </Container>
    </div>
  );
};

export default Cart;
