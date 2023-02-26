import React from "react";
import useCart from "../hooks/useCart";
import useItems from "../hooks/useItems";
import { UseItemsContextType } from "../context/ItemsProvider";
import { ReactElement } from "react";
import Item from "./Item";

const ItemList = () => {
  const { dispatch, REDUCER_ACTIONS, cartToDisplay } = useCart();
  const { items } = useItems();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>;

  if (items?.length) {
    pageContent = items.map((item) => {
      const inCart: boolean = cartToDisplay.some((item) => item.id === item.id);

      return (
        <Item
          key={item.id}
          item={item}
          dispatch={dispatch}
          REDUCER_ACTIONS={REDUCER_ACTIONS}
          inCart={inCart}
        />
      );
    });
  }

  return <main>{pageContent}</main>;
};

export default ItemList;
