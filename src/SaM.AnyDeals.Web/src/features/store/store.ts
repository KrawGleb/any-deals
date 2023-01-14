import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../api/auth/authSlice";
import fileUploadSlice from "./fileUploadSlice";
import { loadState, saveState } from "./localStorage";
import { baseApi } from "../api/baseApi";
import filtersSlice from "./filtersSlice";
import searchSlice from "./searchSlice";

const store = configureStore({
  preloadedState: loadState(),
  reducer: {
    auth: authSlice,
    fileUpload: fileUploadSlice,
    filters: filtersSlice,
    searchSlice: searchSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseApi.middleware]),
});

store.subscribe(() =>
  saveState({
    auth: store.getState().auth,
  })
);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
