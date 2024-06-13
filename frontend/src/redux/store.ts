import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

//FeactureAPIs
import { AuthApi } from "./features/auth-api";
import { ProductApi } from "./features/products-api";
import { OrderApi } from "./features/order-api";


export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, ProductApi.middleware, OrderApi.middleware),
});

setupListeners(store.dispatch);
