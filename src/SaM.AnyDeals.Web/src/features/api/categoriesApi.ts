import { Category } from "../../models/api/category";
import { CommonResponse } from "../../models/api/responses/commonResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({}),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/api/categories",
        method: "GET",
      }),
      transformResponse: (response: CommonResponse) => response.body,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
