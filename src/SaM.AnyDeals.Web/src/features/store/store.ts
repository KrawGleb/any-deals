import { configureStore } from "@reduxjs/toolkit";
import fileUploadSlice from "./slices/fileUploadSlice";
import { baseApi } from "../api/baseApi";
import filtersSlice from "./slices/filtersSlice";
import searchSlice from "./slices/searchSlice";
import authSlice from "./slices/authSlice";
import { loadUser } from "../api/auth/userService";
import { userFound } from "./slices/authSlice";
import tabsSlice from "./slices/tabsSlice";

const loadState = () => {
  loadUser().then((user) => {
    if (user) {
      store.dispatch(userFound({ ...user } as any));
    }
  });

  return {};
};

const store = configureStore({
  preloadedState: loadState(),
  reducer: {
    auth: authSlice,
    fileUpload: fileUploadSlice,
    filters: filtersSlice,
    searchSlice: searchSlice,
    tabs: tabsSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([baseApi.middleware]),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
