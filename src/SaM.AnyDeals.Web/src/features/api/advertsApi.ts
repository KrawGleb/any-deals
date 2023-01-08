import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Advert } from "../../models/api/advert";
import { CommonResponse } from "../../models/api/responses/commonResponse";
import { RootState } from "../store/store";

export const advertsApi = createApi({
  reducerPath: "advertsApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createAdvert: builder.mutation({
      query: (payload) => ({
        url: "/api/adverts/create",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
    getMyAdverts: builder.query<Advert[], void>({
      query: () => ({
        url: "/api/adverts/my",
        method: "GET",
      }),
      transformResponse: (response: CommonResponse) => response.body,
    }),
  }),
});

export const { useCreateAdvertMutation, useGetMyAdvertsQuery } = advertsApi;
