import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "oidc-client";
import { AuthState } from "../../api/auth/authState";

const initialState: AuthState = {
  user: null,
  isLoadingUser: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExpired(state) {
      state = initialState;
    },
    userFound(state, action: PayloadAction<User>) {
      state.user = { ...action.payload } as any;
      state.isLoadingUser = false;
      state.isAdmin =
        (action.payload.profile as any).role?.toString().toLowerCase() ===
        "admin";
    },
    silentRenewError(state, error: PayloadAction) {
      state = initialState;
    },
    sessionTerminated(state) {},
    userExpiring(state) {},
    loadingUser(state) {
      state.isLoadingUser = true;
    },
    userSignedOut(state) {
      state = initialState;
    },
    loadUserError(state) {},
  },
});

export const {
  userExpiring,
  userExpired,
  userFound,
  silentRenewError,
  loadingUser,
  userSignedOut,
} = authSlice.actions;

export default authSlice.reducer;
