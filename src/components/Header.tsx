import React from "react";
import Nav from "./Nav";
import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: PropsType) => {
  const { itemsToDisplay, priceToDisplay } = useCart();

  const content = (
    <header className="header">
      <div className="header__title-bar">
        <h1>TypeScript Cart</h1>
        <div className="header__price-box">
          <p>Total Items: {itemsToDisplay}</p>
          <p>Total Price: {priceToDisplay}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
  return content;
};

export default Header;
