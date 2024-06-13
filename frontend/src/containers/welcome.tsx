"use client";
import React from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";

//components
import Spin from "@/lib/loaders/spinner";

//rtk
import { useCurrentUserQuery } from "@/redux/features/auth-api";
import Link from "next/link";

function Welcome() {
  const { data: userData, isLoading } = useCurrentUserQuery();
  const user = userData?.name;

  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <div className="bg-gray-100 py-4 px-6 rounded flex items-center mb-10 justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user}! 👋🏼{" "}
              {userData && userData?.isAdmin && (
                <span className="text-red-600">admin</span>
              )}
              <br />
              <span className="text-[15px] text-gray-600">
                {" "}
                Your expertise and guidance are invaluable here
              </span>
            </h1>
            {userData && userData?.isAdmin && (
              <Link href={"/dashboard/add-product"}>
                <Button>Add Product</Button>
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Welcome;
