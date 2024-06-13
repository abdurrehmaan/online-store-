import AllProductsListing from "@/containers/dashboard/all-products";
import React from "react";

//components

function DashboardPage() {
  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            All Products Information
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the all the products
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div className="">
        <AllProductsListing />
      </div>
    </>
  );
}

export default DashboardPage;
