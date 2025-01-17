import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  authToken: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = null;
      state.user = null;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setUser, authError } = authSlice.actions;
export default authSlice.reducer;
