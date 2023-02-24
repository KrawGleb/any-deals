import { Order } from "../../../models/api/order";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { Response } from "../../../models/api/responses/response";
import { baseApi } from "../baseApi";

export const ordersApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query<Order, number>({
      query: (payload: number) => ({
        url: `/api/Orders/${payload}`,
        method: "GET",
      }),
      transformResponse: (response: CommonResponse) => response.body,
    }),
    getMyOrders: builder.query<Order[], { archivated: boolean }>({
      query: (payload) => ({
        url: "/api/orders/my",
        method: "GET",
        params: payload,
      }),
      providesTags: ["Orders"],
      transformResponse: (response: CommonResponse) => response.body,
    }),
    getMyRequests: builder.query<Order[], { archivated: boolean }>({
      query: (payload) => ({
        url: "/api/orders/my/requests",
        method: "GET",
        params: payload,
      }),
      providesTags: ["Orders"],
      transformResponse: (response: CommonResponse) => response.body,
    }),
    createOrder: builder.mutation({
      query: (payload: {
        advertId: number;
        paymentMethod: number;
        paymentIntent?: string;
      }) => ({
        url: "/api/orders/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
    approveOrder: builder.mutation<Response, any>({
      query: (payload: { id: number }) => ({
        url: "/api/orders/approve",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Orders"],
    }),
    archivateOrder: builder.mutation<Response, any>({
      query: (payload: { id: number }) => ({
        url: "/api/orders/archivate",
        method: "PATCH",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useGetMyRequestsQuery,
  useCreateOrderMutation,
  useApproveOrderMutation,
  useArchivateOrderMutation,
} = ordersApiExtension;
