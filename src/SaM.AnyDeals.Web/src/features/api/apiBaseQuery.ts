import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.REACT_APP_CONTAINERIZED === "false"
      ? "https://localhost:44315/"
      : "",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-type", "application/json; charset=UTF-8");

    const token = (getState() as RootState).auth.user?.access_token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      return headers;
    }
  },
});

export const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status.toString().startsWith("4")) {
      console.log("Client error", result.error);
      window.location.replace("/");
    }

    if (
      result.error.status === "FETCH_ERROR" ||
      result.error.status.toString().startsWith("5")
    ) {
      console.log("Server error", result.error);
      window.location.replace("/error");
    }
  }

  return result;
};
