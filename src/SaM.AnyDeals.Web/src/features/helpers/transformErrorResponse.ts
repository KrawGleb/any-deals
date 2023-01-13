import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { logout } from "../api/auth/authSlice";
import store from "../store/store";

export default function transformErrorResponse(response: FetchBaseQueryError): any {
    if (response.status === 401) {
        store.dispatch(logout());
    }

    return response;
}