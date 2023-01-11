import { Advert } from "../../../models/api/advert";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { baseApi } from "../baseApi";

export const advertsApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdvert: builder.mutation({
      query: (payload) => ({
        url: "/api/adverts/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Advert"],
    }),
    deleteAdvert: builder.mutation({
      query: (payload: { id: number }) => ({
        url: "/api/adverts/delete",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Advert"],
    }),
    updateAdvert: builder.mutation({
      query: (payload) => ({
        url: "/api/adverts/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Advert"],
    }),
    getMyAdverts: builder.query<Advert[], void>({
      query: () => ({
        url: "/api/adverts/my",
        method: "GET",
      }),
      providesTags: ["Advert"],
      transformResponse: (response: CommonResponse) => response.body,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAdvertMutation,
  useUpdateAdvertMutation,
  useDeleteAdvertMutation,
  useGetMyAdvertsQuery,
} = advertsApiExtension;
