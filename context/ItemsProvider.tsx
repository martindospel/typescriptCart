import React, { createContext, ReactElement, useState } from "react";

export type ItemType = {
  id: string;
  name: string;
  price: number;
};

const initialState: ItemType[] = [
  {
    id: "item001",
    name: "Skjorta",
    price: 19.99,
  },
  {
    id: "item002",
    name: "Jacka",
    price: 19.99,
  },
  {
    id: "item003",
    name: "Byxor",
    price: 19.99,
  },
  {
    id: "item004",
    name: "Skor",
    price: 19.99,
  },
];

export type UseItemsContextType = {
  items: ItemType[];
};

const initialContextState: UseItemsContextType = { items: [] };

const ItemsContext = createContext<UseItemsContextType>(initialContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

//instead of passing the initial state as a param, use the lexical scope instead
export const ItemsProvider = ({ children }: ChildrenType): ReactElement => {
  const [items, setItems] = useState<ItemType[]>(initialState);
  return (
    <ItemsContext.Provider value={{ items }}>{children}</ItemsContext.Provider>
  );
};

export default ItemsContext;
