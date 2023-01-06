import { configureStore } from "@reduxjs/toolkit";
import { advertsApi } from "../features/api/advertsApi";
import authSlice from "../features/api/auth/authSlice";
import { categoriesApi } from "../features/api/categoriesApi";
import { countriesApi } from "../features/api/countriesApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [advertsApi.reducerPath]: advertsApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      advertsApi.middleware,
      countriesApi.middleware,
      categoriesApi.middleware
    ]),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
