import React, { createContext, ReactElement, useState, useEffect } from "react";

export type ItemType = {
  id: string;
  name: string;
  price: number;
};

const initialState: ItemType[] = [];

export type UseItemsContextType = {
  items: ItemType[];
};

const initialContextState: UseItemsContextType = { items: [] };

const ItemsContext = createContext<UseItemsContextType>(initialContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ItemsProvider = ({ children }: ChildrenType): ReactElement => {
  const [items, setItems] = useState<ItemType[]>(initialState);

  //set the items that I will receive from json server
  useEffect(() => {
    const fetchItems = async (): Promise<ItemType[]> => {
      const data = await fetch("http://localhost:1234/items")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error)
            console.log(
              `Something went wrong: Name: ${err.name}. Message: ${err.message}`
            );
        });
      return data;
    };

    fetchItems().then((items) => setItems(items));
  }, []);

  return (
    <ItemsContext.Provider value={{ items }}>{children}</ItemsContext.Provider>
  );
};

export default ItemsContext;
