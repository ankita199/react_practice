import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
    },
    login(state) {
      state.isAuthenticated = true;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
