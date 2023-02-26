import React, { ReactElement } from "react";
import { ItemType } from "../context/ItemsProvider";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";

type PropsType = {
  item: ItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Item = ({
  item,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropsType): ReactElement => {
  const img: string = new URL(`../images/${item.id}.jpg`, import.meta.url).href;

  return <div>Item</div>;
};

export default Item;
