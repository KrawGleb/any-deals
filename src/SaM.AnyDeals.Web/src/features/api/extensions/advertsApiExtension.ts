import { Advert } from "../../../models/api/advert";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { Review } from "../../../models/api/review";
import { SearchAdvertsParams } from "../../../models/searchAdvertsParams";
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
    updateAdvertStatus: builder.mutation({
      query: (payload: { id: number; status: number }) => ({
        url: `/api/admins/advert/${payload.id}/status`,
        method: "PUT",
        body: {
          status: payload.status,
        },
      }),
      invalidatesTags: ["Advert", "Categories"],
    }),
    getAdvertReviews: builder.query<Review[], { id: number }>({
      query: (payload) => ({
        url: `/api/adverts/${payload.id}/reviews`,
        method: "GET",
      }),
      transformResponse: (response: CommonResponse) => response.body,
    }),
    getAdvertById: builder.query<Advert, number>({
      query: (payload: number) => ({
        url: `/api/adverts/${payload}`,
        method: "GET",
      }),
      providesTags: ["Advert"],
      transformResponse: (response: CommonResponse) => response.body,
    }),
    getMyAdverts: builder.query<Advert[], void>({
      query: () => ({
        url: "/api/adverts/my",
        method: "GET",
      }),
      providesTags: ["Advert"],
      transformResponse: (response: CommonResponse) => response.body,
    }),
    searchAdverts: builder.query<Advert[], SearchAdvertsParams>({
      query: (payload: SearchAdvertsParams) => ({
        url: "/api/adverts/search",
        method: "GET",
        params: { ...payload },
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
  useUpdateAdvertStatusMutation,
  useGetAdvertReviewsQuery,
  useGetAdvertByIdQuery,
  useGetMyAdvertsQuery,
  useSearchAdvertsQuery,
} = advertsApiExtension;
