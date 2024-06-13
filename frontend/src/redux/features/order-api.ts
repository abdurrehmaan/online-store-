import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

//interface
interface comfirmOrderI {
  orderItems: OrderItemI[];
  shippingAddress: ShippingAddressI;
  paymentMethod: string;
  shippingPrice: string;
  taxPrice: number;
  totalPrice: number;
  price: number;
}

interface OrderItemI {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}

interface ShippingAddressI {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "data" in error;
}

export const OrderApi = createApi({
  reducerPath: "OrderApi",
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
  tagTypes: ["OrderApi"],
  endpoints: (builder) => ({
    PaymentResult: builder.query<any, string | string[]>({
      query: (id) => ({
        url: `/orders/${id}/pay`,
        method: "GET",
      }),
    }),

    ConfirmOrder: builder.mutation<any, void>({
      query: (payload) => ({
        url: `/orders/`,
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useConfirmOrderMutation, usePaymentResultQuery } = OrderApi;
