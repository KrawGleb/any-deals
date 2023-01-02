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
  extraReducers: {
    [registerUser.pending as any]: (state: AuthState) => {
      state.error = null;
    },
    [registerUser.fulfilled as any]: (state: AuthState, { payload }) => {
      state.succeeded = true;
    },
    [registerUser.rejected as any]: (state: AuthState, { payload }) => {
      state.succeeded = false;
      state.error = payload;
    },

    [loginUser.pending as any]: (state: AuthState, { payload }) => {
      state.error = null;
    },
    [loginUser.fulfilled as any]: (state: AuthState, { payload }) => {
      state.succeeded = true;
      state.userInfo = payload;
      state.userToken = payload.token;
    },
    [loginUser.rejected as any]: (state: AuthState, { payload }) => {
        state.succeeded = false;
        state.error = payload;
    },
  },
});

export default authSlice.reducer;
