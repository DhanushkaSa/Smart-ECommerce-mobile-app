import { createSlice } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
};

interface CartItem {
  id: number | string;
  name: string;
  qty: number;
  sum: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    // add to cart
    addToCartItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        ((existingItem.qty += 1), (existingItem.sum += action.payload.price));
      } else {
        state.items.push({
          ...action.payload,
          qty: 1,
          sum: action.payload.price,
        });
      }
    },
    // remove cart item
    removeItemFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.qty != 1) {
        existingItem.qty -= 1;
        existingItem.sum -= action.payload.price;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    // remove cart product
    removeCartProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    //empty cart
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCartItem,
  removeItemFromCart,
  removeCartProduct,
  emptyCart,
} = cartSlice.actions;
export default cartSlice;
