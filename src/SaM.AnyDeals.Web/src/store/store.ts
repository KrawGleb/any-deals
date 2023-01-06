import { configureStore } from "@reduxjs/toolkit";
import { advertsApi } from "../features/api/advertsService";
import authSlice from "../features/api/auth/authSlice";
import { categoriesApi } from "../features/api/categoriesService";
import { countriesApi } from "../features/api/countriesService";

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
