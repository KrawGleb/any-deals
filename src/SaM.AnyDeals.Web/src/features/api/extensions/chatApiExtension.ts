import { Message } from "../../../models/api/message";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { baseApi } from "../baseApi";

export const chatApiExtension = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], { id: number }>({
      query: (payload: { id: number }) => ({
        url: `/api/chat/${payload.id}`,
        method: "GET",
      }),
      providesTags: ["Chat"],
      transformResponse: (response: CommonResponse) => response.body,
    }),
    sendMessage: builder.mutation({
      query: (payload: { orderId: number; text: string }) => ({
        url: "/api/chat",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMessagesQuery, useSendMessageMutation } = chatApiExtension;
