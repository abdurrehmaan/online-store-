"use client";
import { useAllProductsQuery } from "@/redux/features/products-api";
import Link from "next/link";
import React from "react";

//interface
interface ProductI {
  _id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  numReview: number;
  countInStock: number;
  price: number;
  review: any[]; // Consider defining a more specific type for reviews if possible
}

function AllProductsListing() {
  const { data: ListofAllProducts } = useAllProductsQuery(
      undefined,
      {
        refetchOnMountOrArgChange: true,
      }
    );
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {ListofAllProducts?.map((product: ProductI) => {
              return (
                <div className="xl:w-1/4 md:w-1/2 p-4" key={product._id}>
                  <Link href={`dashboard/products/${product._id}`}>
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="group relative">
                          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                              src={product.image}
                              alt="Front of men&#039;s Basic Tee in black."
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="mt-4 flex justify-between">
                            <div>
                              <h3 className="text-sm text-gray-700">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                ></span>
                                {product.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                Current in Stock : {product.countInStock}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {product.price} PKR
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default AllProductsListing;
