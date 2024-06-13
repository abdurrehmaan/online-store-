"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConfirmOrderMutation } from "@/redux/features/order-api";

interface CartItemI {
  id: null | undefined;
  name: string;
  price: number;
  image: string;
  product: string;
  qty: number;
}

const PaymentZodSchema = z.object({
  address: z.string().min(1, { message: "Address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  paymentMethod: z.string().min(1, { message: "Payment method is required." }),

  CardNumber: z.string().min(1, { message: "Card number is required." }),
  NameOnCard: z.string().min(1, { message: "Name on card is required." }),
  ExpirationDate: z
    .string()
    .min(1, { message: "Expiration date is required." }),
  CVC: z.string().min(1, { message: "CVC is required." }),
});

function ConfirmOrder() {
  const [cartItems, setCartsItems] = useState<CartItemI[]>([]);
  const [
    confirmOrder,
    { data: confirmOrderData, isLoading, isError, isSuccess, error },
  ] = useConfirmOrderMutation();

  const { push } = useRouter();
  useEffect(() => {
    const cartItem = window.localStorage.getItem("cart");
    setCartsItems(cartItem ? JSON.parse(cartItem) : []);
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const Tax = 50;
  const Shipping = 100;

  const form = useForm<z.infer<typeof PaymentZodSchema>>({
    resolver: zodResolver(PaymentZodSchema),
    defaultValues: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "",
      CardNumber: "",
      NameOnCard: "",
      ExpirationDate: "",
      CVC: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PaymentZodSchema>) {
    try {
      const payload = {
        orderItems: cartItems,
        shippingAddress: {
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country,
        },
        paymentMethod: values.paymentMethod,
        shippingPrice: Shipping,
        taxPrice: Tax,
        totalPrice: subtotal + Tax + Shipping,
        price: 98,
      };

      const orderinfo = await confirmOrder(payload);
      const orderId = orderinfo?.data?._id;
      push(`/dashboard/order/complete/${orderId}`);
      console.log(orderinfo, "orderinfo");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-bold text-gray-900">Checkout</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>postal Code</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <fieldset className="mt-4">
                  <legend className="sr-only">Payment type</legend>
                  <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    <div className="col-span-4">
                      <div className="mt-1">
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Method</FormLabel>
                              <FormControl>
                                <Input
                                  className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="col-span-4">
                  <div className="col-span-3">
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="CardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="NameOnCard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name On Card</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="ExpirationDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiration Date</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="CVC"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input
                                className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product?.id} className="flex px-4 py-6 sm:px-6">
                      <div className="flex-shrink-0">
                        <img src={product?.image} className="w-20 rounded-md" />
                      </div>

                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm">{product?.name}</h3>{" "}
                        </div>
                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {product?.price} PKR
                          </p>

                          <div className="ml-4">
                            <p className="max-w-full py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                              Qty : {product?.qty}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {" "}
                      {subtotal} PKR
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {Shipping} PKR
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Taxes</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      {Tax} PKR
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      {subtotal + Tax + Shipping} PKR
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  {/* <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button> */}

                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Confirm order
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ConfirmOrder;
