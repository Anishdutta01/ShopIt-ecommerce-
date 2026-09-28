import { createSlice } from '@reduxjs/toolkit';

const getStorageKey = (ownerId) => `cartItems:${ownerId}`;

const loadCartItems = (ownerId) => {
  if (!ownerId) return [];

  try {
    const storedItems = localStorage.getItem(getStorageKey(ownerId));
    return storedItems ? JSON.parse(storedItems) : [];
  } catch {
    return [];
  }
};

const initialState = {
  ownerId: null,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOwner: (state, action) => {
      const ownerId = action.payload ? String(action.payload) : null;
      if (state.ownerId === ownerId) return;

      state.ownerId = ownerId;
      state.cartItems = loadCartItems(ownerId);
    },
    addToCart: (state, action) => {
      if (!state.ownerId) return;

      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.productId === item.productId);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.productId === existItem.productId ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      localStorage.setItem(getStorageKey(state.ownerId), JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      if (!state.ownerId) return;

      state.cartItems = state.cartItems.filter((x) => x.productId !== action.payload);
      localStorage.setItem(getStorageKey(state.ownerId), JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      if (state.ownerId) {
        localStorage.removeItem(getStorageKey(state.ownerId));
      }
    }
  },
});

export const { setCartOwner, addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
