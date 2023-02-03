import { configureStore } from "@reduxjs/toolkit";
import fileUploadSlice from "./slices/fileUploadSlice";
import { baseApi } from "../api/baseApi";
import filtersSlice from "./slices/filtersSlice";
import searchSlice from "./slices/searchSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
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

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
