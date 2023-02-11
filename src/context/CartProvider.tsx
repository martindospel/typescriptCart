import React, { createContext, ReactElement, useMemo, useReducer } from "react";

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStateType = { cart: CartItemType[] };

const initialCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in reducer ADD action");
      }
      const { id, name, price } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );
      const cartItemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );
      const quantity: number = cartItemExists ? cartItemExists.quantity + 1 : 1;
      return {
        ...state,
        cart: [...filteredCart, { id, name, price, quantity }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error("action.payload missing in reducer REMOVE action");
      }
      const { id } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );
      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in reducer QUANTITY action");
      }
      const { id, quantity } = action.payload;
      const cartItemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!cartItemExists) {
        throw new Error(
          "Cannot update quantity of an item which doesn't exist"
        );
      }

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      const updatedCartItem: CartItemType = { ...cartItemExists, quantity };

      return { ...state, cart: [...filteredCart, updatedCartItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Not a reducer action");
  }
};

const useCartContext = (initialCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const itemsToDisplay: number = state.cart.reduce(
    (previousValue, cartItem) => {
      return previousValue + cartItem.quantity;
    },
    0
  );

  const priceToDisplay = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce((previousValue, cartItem) => {
      return previousValue + cartItem.quantity * cartItem.price;
    }, 0)
  );

  const cartToDisplay = state.cart.sort((a, b) => {
    const itemA = Number(a.id.slice(-3));
    const itemB = Number(b.id.slice(-3));
    return itemA - itemB;
  });

  return {
    dispatch,
    REDUCER_ACTIONS,
    itemsToDisplay,
    priceToDisplay,
    cartToDisplay,
  };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initialCartContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
  itemsToDisplay: 0,
  priceToDisplay: "",
  cartToDisplay: [],
};

export const CartContext = createContext<UseCartContextType>(
  initialCartContextState
);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initialCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
