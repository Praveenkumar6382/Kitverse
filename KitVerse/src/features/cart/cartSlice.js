import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");


const initialState = {
  items: storedCart ? JSON.parse(storedCart) : [],
};


const saveCartToLocalStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // ADDTOCART
    addToKitBag(state, action) {
      const product = action.payload;
      const productId = product._id || product.id;



      const existing = state.items.find((item) => (item._id || item.id) === productId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
      saveCartToLocalStorage(state.items);

    },


    // REMOVEFROMCART
    removeFromCart(state, action) {
            const targetId = action.payload;
      state.items = state.items.filter((item) => (item._id || item.id)  !== targetId);
   saveCartToLocalStorage(state.items);

    },


    // INCREASEQUANTITY AND DECREASEQUANTITY
    increaseQuantity(state, action) {
            const targetId = action.payload;

      const item = state.items.find((item) => (item._id || item.id)=== targetId);

      if (item) {
        item.quantity++;
      }
      saveCartToLocalStorage(state.items);

    },

    decreaseQuantity(state, action) {
            const targetId = action.payload;

      const item = state.items.find((item) => (item._id || item.id) === targetId);

      if (item) {
        item.quantity--;

        if (item.quantity === 0) {
          state.items = state.items.filter(
            (item) =>(item._id || item.id) !== targetId,
          );
        }
      }
      saveCartToLocalStorage(state.items);

    },

    clearItem: (state, action) => {
            const targetId = action.payload;

      state.items = state.items.filter((item) =>(item._id || item.id) !== action.payload);
  saveCartToLocalStorage(state.items);

    },
     clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToKitBag, removeFromCart, increaseQuantity, decreaseQuantity, clearItem,clearCart } = cartSlice.actions;

export default cartSlice.reducer;