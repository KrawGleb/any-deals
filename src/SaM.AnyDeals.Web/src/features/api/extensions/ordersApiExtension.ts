import { Order } from "../../../models/api/order";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import transformErrorResponse from "../../helpers/transformErrorResponse";
import { baseApi } from "../baseApi";

export const ordersApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/api/orders/my",
        method: "GET",
      }),
      providesTags: ["Orders"],
      transformErrorResponse,
      transformResponse: (response: CommonResponse) => response.body
    }),
    getMyRequests: builder.query<Order[], void>({
      query: () => ({
        url: "/api/orders/my/requests",
        method: "GET",
      }),
      providesTags: ["Orders"],
      transformErrorResponse,
      transformResponse: (response: CommonResponse) => response.body
    }),
    createOrder: builder.mutation({
      query: (payload: { advertId: number }) => ({
        url: "/api/orders/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
      transformErrorResponse,
    }),
    approveOrder: builder.mutation({
      query: (payload: { id: number }) => ({
        url: "/api/orders/my",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
      transformErrorResponse,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyOrdersQuery,
  useGetMyRequestsQuery,
  useCreateOrderMutation,
  useApproveOrderMutation,
} = ordersApiExtension;
