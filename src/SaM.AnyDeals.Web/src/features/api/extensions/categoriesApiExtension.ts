import { Category } from "../../../models/api/category";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { baseApi } from "../baseApi";

export const categoriesApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/api/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
      transformResponse: (response: CommonResponse) => response.body,
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoriesApiExtension;
