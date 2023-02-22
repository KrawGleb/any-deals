import { baseApi } from "../baseApi";

export const advertsApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createIntent: builder.mutation({
      query: (payload: { advertId: number }) => ({
        url: "/api/payment",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateIntentMutation } = advertsApiExtension;
