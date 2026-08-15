import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
};

const saveUserToLocalStorage = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const clearUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const userSlice = createSlice({
  name: "user",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      saveUserToLocalStorage(
        action.payload.user,
        action.payload.token
      );
    },

    logout: (state) => {
      state.user = null;
      state.token = null;

      clearUserFromLocalStorage();
    },
  },
});

export const {
  loginSuccess,
  logout,
} = userSlice.actions;

export default userSlice.reducer;