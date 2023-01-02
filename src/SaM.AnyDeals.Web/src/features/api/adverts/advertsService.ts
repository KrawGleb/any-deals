import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "../../../store/store";

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
  }),
});

export const { useCreateAdvertMutation } = advertsApi;
