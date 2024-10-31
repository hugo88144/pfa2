import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null, // Initial state for token
    // other properties...
  },
  reducers: {
    setAuthToken(state, action) {
      state.token = action.payload; // Update state with the token
    },
    clearAuthToken(state) {
      state.token = null; // Clear token
    },
    // other reducers...
  },
});

// Export the actions
export const { setAuthToken, clearAuthToken } = authSlice.actions;

// Selector to access the token
export const selectAuthToken = (state) => state.auth.token;

// Export the reducer
export default authSlice.reducer;
