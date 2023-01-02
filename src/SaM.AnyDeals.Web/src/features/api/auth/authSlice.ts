import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authActions";
import { AuthState } from "./authState";

const userToken = localStorage.getItem("userToken") ?? null;

const initialState: AuthState = {
  userInfo: {},
  userToken,
  error: null,
  succeeded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.succeeded = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.succeeded = false;
        state.error = payload;
      });

    builder
      .addCase(loginUser.pending, (state, { payload }) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.succeeded = true;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.succeeded = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
