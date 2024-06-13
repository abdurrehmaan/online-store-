"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { usePaymentResultQuery } from "@/redux/features/order-api";
import { randomUUID } from "crypto";

function CompleteOrder() {
  const params = useParams();
  const id = params.id as string;

  const { data: PaymentComplete } = usePaymentResultQuery(id);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify([]));
  }, [window.localStorage.setItem("cart", JSON.stringify([]))]);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl">
            <h1 className="text-base font-medium text-indigo-600">
              Thank you!
            </h1>
            <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              It's on the way!
            </p>
            <p className="mt-2 text-base text-gray-500">
              Your order #14034056 has shipped and will be with you soon.
            </p>

            <dl className="mt-12 text-sm font-medium">
              <dt className="text-gray-900">Tracking number</dt>
              <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
            </dl>
          </div>

          <div className="mt-10 border-t border-gray-200">
            <h2 className="sr-only">Your order</h2>

            <h3 className="sr-only">Items</h3>
            {/* {products.map((product) => (
              <div
                key={product.id}
                className="flex space-x-6 border-b border-gray-200 py-10"
              >
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                />
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {product.quantity}
                        </dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">{product.price}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))} */}

            <div className="sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              <h4 className="sr-only">Addresses</h4>
              <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping address
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">
                        {
                          PaymentComplete?.updatedOrder?.shippingAddress
                            ?.address
                        }
                      </span>
                      <span className="block">
                        {PaymentComplete?.updatedOrder?.shippingAddress?.city}
                      </span>
                      <span className="block">
                        {
                          PaymentComplete?.updatedOrder?.shippingAddress
                            ?.postalCode
                        }
                      </span>
                      <span className="block">
                        {
                          PaymentComplete?.updatedOrder?.shippingAddress
                            ?.country
                        }
                      </span>
                    </address>
                  </dd>
                </div>
              </dl>

              <h4 className="sr-only">Payment</h4>
              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">Payment method</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>{PaymentComplete?.updatedOrder?.paymentMethod}</p>
                  </dd>
                </div>
              </dl>

              <h3 className="sr-only">Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Shipping</dt>
                  <dd className="text-gray-700">
                    {PaymentComplete?.updatedOrder?.shippingPrice} PKR
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Tax</dt>
                  <dd className="text-gray-700">
                    {PaymentComplete?.updatedOrder?.taxPrice} PKR
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="text-gray-900">
                    {PaymentComplete?.updatedOrder?.totalPrice} PKR
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompleteOrder;
