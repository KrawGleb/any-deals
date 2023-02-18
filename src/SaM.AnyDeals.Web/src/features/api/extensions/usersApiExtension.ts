import { baseApi } from "../baseApi";

export const usersApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (payload: string) => ({
        url: `/api/users/details/${payload}`,
        method: "GET",
      }),
    }),
  }),

  overrideExisting: false,
});

export const { useGetUserDetailsQuery } = usersApiExtension;
