import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-type", "application/json; charset=UTF-8");

      const token = (getState() as RootState).auth.user?.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["Advert", "Orders", "Reviews", "Categories", "Chat"],
  endpoints: () => ({}),
});
