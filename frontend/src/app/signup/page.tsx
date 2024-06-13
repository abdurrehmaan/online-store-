import SignUp from "@/containers/signup";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function SignupPage() {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6  bg-white">
        <div className="mx-auto w-full max-w-sm bg-500 mb-10">
          <div>
            <Image src="/logo.png" alt="Osct logo" height={80} width={80} />
            <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Online Store - SignUp
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enterprise Version
            </p>
          </div>
          <div className="my-10">
            <div>
              <SignUp />
            </div>
          </div>
          Don’t have an account yet?
          <Link href={"/"} className="text-blue-600">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
