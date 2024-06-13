import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

//interface
interface LoginI {
  email: string;
  password: string;
}
interface SignUpI {
  email: string;
  name: string;
  password: string;
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "data" in error;
}

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("loginToken");
      console.log(token, "token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["AuthApi"],
  endpoints: (builder) => ({
    authLogin: builder.mutation<void, LoginI>({
      query: (payload) => ({
        url: "/users/login",
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    AuthSignup: builder.mutation<void, SignUpI>({
      query: (payload) => ({
        url: "/users/signup",
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    authLogout: builder.mutation<any, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    currentUser: builder.query<any, void>({
      query: () => {
        return {
          url: "/users/profile",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAuthLogoutMutation,
  useAuthLoginMutation,
  useCurrentUserQuery,
  useAuthSignupMutation,
} = AuthApi;
