import React, { createContext, ReactElement, useState, useEffect } from "react";

export type ItemType = {
  id: string;
  name: string;
  price: number;
};

// const initialState: ItemType[] = [];
const initialState: ItemType[] = [
  {
    id: "item0001",
    name: "byxor",
    price: 39.99,
  },
  {
    id: "item0002",
    name: "jacket",
    price: 19.99,
  },
  {
    id: "item0003",
    name: "shirt",
    price: 29.99,
  },
  {
    id: "item0004",
    name: "shoes",
    price: 29.99,
  },
];

export type UseItemsContextType = {
  items: ItemType[];
};

const initialContextState: UseItemsContextType = { items: [] };

const ItemsContext = createContext<UseItemsContextType>(initialContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ItemsProvider = ({ children }: ChildrenType): ReactElement => {
  const [items, setItems] = useState<ItemType[]>(initialState);

  // useEffect(() => {
  //   const fetchItems = async (): Promise<ItemType[]> => {
  //     const data = await fetch("http://localhost:1234/items")
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .catch((err) => {
  //         if (err instanceof Error)
  //           console.log(
  //             `Something went wrong: Name: ${err.name}. Message: ${err.message}`
  //           );
  //       });
  //     return data;
  //   };

  //   fetchItems().then((items) => setItems(items));
  // }, []);

  return (
    <ItemsContext.Provider value={{ items }}>{children}</ItemsContext.Provider>
  );
};

export default ItemsContext;
