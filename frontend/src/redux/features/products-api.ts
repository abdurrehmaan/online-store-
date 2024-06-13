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

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "data" in error;
}

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = Cookies.get("loginToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ProductApi"],
  endpoints: (builder) => ({
    specificProducts: builder.query<any, string | string[]>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    AllProducts: builder.query<any, void>({
      query: () => {
        return {
          url: "/products/",
          method: "GET",
        };
      },
    }),
    AddProduct: builder.mutation<any, void>({
      query: (payload) => ({
        url: `/products/add-product`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useAllProductsQuery, useSpecificProductsQuery, useAddProductMutation} = ProductApi;
