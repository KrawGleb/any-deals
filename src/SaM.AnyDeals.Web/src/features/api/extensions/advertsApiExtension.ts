import { Advert } from "../../../models/api/advert";
import { ElasticAdvert } from "../../../models/api/elasticAdvert";
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
      transformErrorResponse
    }),
    deleteAdvert: builder.mutation({
      query: (payload: { id: number }) => ({
        url: "/api/adverts/delete",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["Advert"],
      transformErrorResponse
    }),
    updateAdvert: builder.mutation({
      query: (payload) => ({
        url: "/api/adverts/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Advert"],
      transformErrorResponse
    }),
    getMyAdverts: builder.query<Advert[], void>({
      query: () => ({
        url: "/api/adverts/my",
        method: "GET",
      }),
      providesTags: ["Advert"],
      transformResponse: (response: CommonResponse) => response.body,
      transformErrorResponse: (response) => transformErrorResponse(response)
    }),
    searchAdverts: builder.query<Advert[], SearchAdvertsParams>({
      query: (payload: SearchAdvertsParams) => ({
        url: "/api/adverts/search",
        method: "GET",
        params: {...payload}
      }),
      providesTags: ["Advert"],
      transformResponse: (response: CommonResponse) => response.body,
      transformErrorResponse
    })
  }),
  overrideExisting: false,
});

export const {
  useCreateAdvertMutation,
  useUpdateAdvertMutation,
  useDeleteAdvertMutation,
  useGetMyAdvertsQuery,
  useSearchAdvertsQuery,
} = advertsApiExtension;
