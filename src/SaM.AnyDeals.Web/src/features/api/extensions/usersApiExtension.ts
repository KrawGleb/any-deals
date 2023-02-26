import { ApplicationUser } from "../../../models/api/applicationUser";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { baseApi } from "../baseApi";

export const usersApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (payload: string) => ({
        url: `/api/users/details/${payload}`,
        method: "GET",
      }),
    }),
    getMe: builder.query<ApplicationUser, void>({
      query: () => ({
        url: `/api/users/me`,
        method: "GET",
      }),
      transformResponse: (response: CommonResponse) => response.body,
    }),
  }),

  overrideExisting: false,
});

export const { useGetUserDetailsQuery, useGetMeQuery } = usersApiExtension;
