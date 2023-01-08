import { configureStore } from "@reduxjs/toolkit";
import { advertsApi } from "../api/advertsApi";
import authSlice from "../api/auth/authSlice";
import { categoriesApi } from "../api/categoriesApi";
import { countriesApi } from "../api/countriesApi";
import fileUploadSlice from "./fileUploadSlice";
import { loadState, saveState } from "./localStorage";
import myAdvertsSlice from "./myAdvertsSlice";

const store = configureStore({
  preloadedState: loadState(),
  reducer: {
    auth: authSlice,
    fileUpload: fileUploadSlice,
    myAdverts: myAdvertsSlice,
    [advertsApi.reducerPath]: advertsApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      advertsApi.middleware,
      countriesApi.middleware,
      categoriesApi.middleware,
    ]),
});

store.subscribe(() =>
  saveState({
    auth: store.getState().auth,
  })
);

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
