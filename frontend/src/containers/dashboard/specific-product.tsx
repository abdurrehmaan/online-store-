"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import { useSpecificProductsQuery } from "@/redux/features/products-api";

//interface
interface CartI {
  name: string;
  price: number;
  image: string;
  product: string;
}

function SpecificProducts() {
  const params = useParams();
  const id = params.id as string;
  const { data: specificProductInfomation } = useSpecificProductsQuery(id);

  const [qty, setQty] = React.useState(1);
  let listofitems = JSON.parse(window.localStorage.getItem("cart") || "[]");

  function handelCart({ name, price, image, product }: CartI) {
    const item = {
      product,
      name,
      price,
      image,
      qty,
    };

    listofitems.push(item);

    window.localStorage.setItem("cart", JSON.stringify(listofitems));
  }

  return (
    <>
      <div className="bg-white">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {specificProductInfomation?.name}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    PKR {specificProductInfomation?.price}
                  </p>
                </div>
                <div className="mt-10">
                  <h1>Quantity</h1>

                  <div className=" flex gap-6">
                    <button
                      className="bg-indigo-700 text-white font-bold py-2 px-4 rounded text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        if (qty == 1) {
                          alert("Can't be less than 1");
                        } else {
                          setQty(qty - 1);
                        }
                      }}
                    >
                      - Remove{" "}
                    </button>
                    <h1 className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-none">
                      {qty}
                    </h1>
                    <button
                      onClick={() => {
                        if (qty == specificProductInfomation?.countInStock) {
                          alert("Out of Stock");
                        } else {
                          setQty(qty + 1);
                        }
                      }}
                      className="bg-indigo-700 text-white font-bold py-2 px-4 rounded text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      + Add
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700">
                      {specificProductInfomation?.rating}
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                    <div className="ml-1 flex items-center">
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-200"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div
                      aria-hidden="true"
                      className="ml-4 text-sm text-gray-300"
                    >
                      ·
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <img
                    src={specificProductInfomation?.image}
                    className="rounded-lg lg:col-span-2 lg:row-span-2"
                  />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <div>
                  <h2 className="text-sm font-medium text-gray-900">Color</h2>

                  <fieldset aria-label="Choose a color" className="mt-2">
                    <div className="flex items-center space-x-3">
                      <label
                        aria-label="Black"
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-none"
                      >
                        <input
                          type="radio"
                          name="color-choice"
                          value="Black"
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-900"
                        ></span>
                      </label>

                      <label
                        aria-label="Heather Grey"
                        className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none"
                      >
                        <input
                          type="radio"
                          name="color-choice"
                          value="Heather Grey"
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-400"
                        ></span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-2">
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      <label className="flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase focus:outline-none sm:flex-1">
                        <input
                          type="radio"
                          name="size-choice"
                          value="XXS"
                          className="sr-only"
                        />
                        <span>XXS</span>
                      </label>

                      <label className="flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase focus:outline-none sm:flex-1">
                        <input
                          type="radio"
                          name="size-choice"
                          value="XS"
                          className="sr-only"
                        />
                        <span>XS</span>
                      </label>

                      <label className="flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase focus:outline-none sm:flex-1">
                        <input
                          type="radio"
                          name="size-choice"
                          value="S"
                          className="sr-only"
                        />
                        <span>S</span>
                      </label>

                      <label className="flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase focus:outline-none sm:flex-1">
                        <input
                          type="radio"
                          name="size-choice"
                          value="M"
                          className="sr-only"
                        />
                        <span>M</span>
                      </label>

                      <label className="flex cursor-pointer items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase focus:outline-none sm:flex-1">
                        <input
                          type="radio"
                          name="size-choice"
                          value="L"
                          className="sr-only"
                        />
                        <span>L</span>
                      </label>

                      <label className="flex cursor-not-allowed items-center justify-center rounded-md border px-3 py-3 text-sm font-medium uppercase opacity-25 sm:flex-1">
                        <input
                          type="radio"
                          name="size-choice"
                          value="XL"
                          disabled
                          className="sr-only"
                        />
                        <span>XL</span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() =>
                    handelCart({
                      product: specificProductInfomation?._id,
                      name: specificProductInfomation?.name,
                      price: specificProductInfomation?.price,
                      image: specificProductInfomation?.image,
                    })
                  }
                >
                  Add to cart
                </button>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>

                  <div className="prose prose-sm mt-4 text-gray-500">
                    <p>
                      The Basic tee is an honest new take on a classic. The tee
                      uses super soft, pre-shrunk cotton for true comfort and a
                      dependable fit. They are hand cut and sewn locally, with a
                      special dye technique that gives each tee it's own look.
                    </p>
                    <p>
                      Looking to stock your closet? The Basic tee also comes in
                      a 3-pack or 5-pack at a bundle discount.
                    </p>
                  </div>
                </div>

                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>

                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                      <dt>
                        <svg
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          Loyalty rewards
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        Don&#039;t look at other tees
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificProducts;
