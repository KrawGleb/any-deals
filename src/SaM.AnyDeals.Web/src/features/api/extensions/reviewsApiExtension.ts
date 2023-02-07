import { Review } from "../../../models/api/review";
import { baseApi } from "../baseApi";

export const reviewsApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload: Review) => ({
        url: "/api/reviews",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateReviewMutation } = reviewsApiExtension;
