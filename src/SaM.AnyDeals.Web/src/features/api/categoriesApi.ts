import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category } from "../../models/api/category";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/api/categories",
        method: "GET",
      }),
      transformResponse: (response: any) => response.body,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
