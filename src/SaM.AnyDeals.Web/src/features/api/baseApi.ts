import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./apiBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Advert", "Orders", "Reviews", "Categories", "Chat"],
  endpoints: () => ({}),
});
