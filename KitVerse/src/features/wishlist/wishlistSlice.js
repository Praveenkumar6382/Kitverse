import { createSlice } from "@reduxjs/toolkit";

const storedWishlist = localStorage.getItem("wishlist");

const initialState = {
  items: storedWishlist ? JSON.parse(storedWishlist) : [],
};

const saveWishlistToLocalStorage = (items) => {
  localStorage.setItem("wishlist", JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {

    // ADD TO WISHLIST
    addToWishlist: (state, action) => {

      const product = action.payload;
      const productId = product._id || product.id;

      const exists = state.items.find(
        (item) => (item._id || item.id) === productId
      );

      if (!exists) {
        state.items.push(product);
      }

      saveWishlistToLocalStorage(state.items);
    },

    // REMOVE FROM WISHLIST
    removeFromWishlist: (state, action) => {

      const targetId = action.payload;

      state.items = state.items.filter(
        (item) => (item._id || item.id) !== targetId
      );

      saveWishlistToLocalStorage(state.items);
    },

    // CLEAR WISHLIST
    clearWishlist: (state) => {

      state.items = [];

      saveWishlistToLocalStorage(state.items);
    },

  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;