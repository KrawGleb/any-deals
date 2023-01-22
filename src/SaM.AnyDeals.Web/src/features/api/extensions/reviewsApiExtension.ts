import { Review } from "../../../models/api/review";
import { baseApi } from "../baseApi";
import transformErrorResponse from "../../helpers/transformErrorResponse";

export const reviewsApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload: Review) => ({
        url: "/api/reviews",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Reviews"],
      transformErrorResponse,
    }),
  }),
  overrideExisting: false,
});

export const { useCreateReviewMutation } = reviewsApiExtension;
