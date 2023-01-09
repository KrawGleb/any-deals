import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Advert } from "../../models/api/advert";
import { CommonResponse } from "../../models/api/responses/commonResponse";
import { RootState } from "../store/store";

export const advertsApi = createApi({
  reducerPath: "advertsApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-type", "application/json; charset=UTF-8");

      const token = (getState() as RootState).auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["Advert"],
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
});

export const {
  useCreateAdvertMutation,
  useUpdateAdvertMutation,
  useDeleteAdvertMutation,
  useGetMyAdvertsQuery,
} = advertsApi;
