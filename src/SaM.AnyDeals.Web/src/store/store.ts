import { configureStore } from "@reduxjs/toolkit";
import { advertsApi } from "../features/api/adverts/advertsService";
import authSlice from "../features/api/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [advertsApi.reducerPath]: advertsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(advertsApi.middleware),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
