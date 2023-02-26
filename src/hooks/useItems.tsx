import { useContext } from "react";

import ItemsContext from "../context/ItemsProvider";
import { UseItemsContextType } from "../context/ItemsProvider";

const useItems = (): UseItemsContextType => {
  return useContext(ItemsContext);
};

export default useItems;
