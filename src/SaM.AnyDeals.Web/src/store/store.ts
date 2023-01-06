import { configureStore } from "@reduxjs/toolkit";
import { advertsApi } from "../features/api/adverts/advertsService";
import authSlice from "../features/api/auth/authSlice";
import { countriesApi } from "../features/api/countries/countriesService";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [advertsApi.reducerPath]: advertsApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      advertsApi.middleware,
      countriesApi.middleware,
    ]),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
