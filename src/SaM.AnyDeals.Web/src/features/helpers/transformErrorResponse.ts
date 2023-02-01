import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import store from "../store/store";

export default function transformErrorResponse(
  response: FetchBaseQueryError
): any {
  if (response.status === 401) {
    console.log("Logout here");
    //store.dispatch(logout());
  }

  return response;
}
