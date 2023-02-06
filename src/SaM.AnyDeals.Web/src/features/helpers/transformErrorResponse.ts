import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export default function transformErrorResponse(
  response: FetchBaseQueryError
): any {
  if (response.status === 401) {
    console.log("Logout here");
    //store.dispatch(logout());
  }

  return response;
}
