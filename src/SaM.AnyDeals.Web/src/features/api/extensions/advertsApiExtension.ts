import { Advert } from "../../../models/api/advert";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { SearchAdvertsParams } from "../../../models/searchAdvertsParams";
import transformErrorResponse from "../../helpers/transformErrorResponse";
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
      transformErrorResponse,
    }),
    deleteAdvert: builder.mutation({
      query: (payload: { id: number }) => ({
        url: "/api/adverts/delete",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Advert"],
      transformErrorResponse,
    }),
    updateAdvert: builder.mutation({
      query: (payload) => ({
        url: "/api/adverts/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Advert"],
      transformErrorResponse,
    }),
    updateAdvertStatus: builder.mutation({
      query: (payload: {id: number, status: number}) => ({
        url: `/api/admins/advert/${payload.id}/status`,
        method: "PUT",
        body: {
          status: payload.status
        }
      }),
      invalidatesTags: ["Advert"],
      transformErrorResponse
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
      transformErrorResponse: (response) => transformErrorResponse(response),
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
  useGetAdvertByIdQuery,
  useGetMyAdvertsQuery,
  useSearchAdvertsQuery,
} = advertsApiExtension;
