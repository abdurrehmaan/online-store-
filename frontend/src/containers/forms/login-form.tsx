"use client";
import React from "react";
import { useRouter } from "next/navigation";

//shadcn companents
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

//RTK Quries
import { useAuthLoginMutation } from "@/redux/features/auth-api";

//util
import Spin from "@/lib/loaders/spinner";
import ErrorMessage from "@/lib/messages/error-messge";
import { string } from "zod";

interface authlogin {
  data: {
    message: string;
  };
}

function LoginForm() {
  const [authLogin, { isLoading, isError, isSuccess, error }] =
    useAuthLoginMutation();
  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      // Call the login mutation with the payload
      await authLogin(payload);
      router.push("/dashboard");
    } catch (e: any) {
      console.log("error", e);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter your email address"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              // //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              <h1>loading...</h1>
            )}
            Sign In with Email
          </Button>

          <div className=" mt-4">
            {isLoading ? (
              <Spin />
            ) : (
              <>
                {isLoading ? (
                  <Spin />
                ) : (
                  <>
                    {isSuccess && (
                      <div>
                        <Spin />
                      </div>
                    )}
                    {error && (
                      <ErrorMessage
                        error={
                          "data" in error && (error as authlogin).data?.message
                        }
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
