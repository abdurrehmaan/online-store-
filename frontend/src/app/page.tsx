import Image from "next/image";

//components
import LoginForm from "@/containers/forms/login-form";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6  bg-white">
        <div className="mx-auto w-full max-w-sm bg-500">
          <div>
            <Image src="/logo.png" alt="Osct logo" height={80} width={80} />
            <h2 className="mt-8 text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Online Store - Login
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Enterprise Version
            </p>
          </div>
          <div className="mt-10">
            <div>
              <LoginForm />
            </div>
          </div>
          Don’t have an account yet?
          <Link href={"/signup"} className="text-blue-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
