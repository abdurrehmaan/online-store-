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
import { useAddProductMutation } from "@/redux/features/products-api";
import { Button } from "@/components/ui/button";
import Spin from "@/lib/loaders/spinner";
import { useAuthSignupMutation } from "@/redux/features/auth-api";

const userSignZodSchema = z.object({
  name: z.string().min(1, { message: "name is required." }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "password is required." }),
});

function SignUp() {
  const [authSignup, { isLoading, isError, isSuccess, error }] =
    useAuthSignupMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof userSignZodSchema>>({
    resolver: zodResolver(userSignZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSignZodSchema>) {
    try {
      console.log(values);

      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      await authSignup(payload);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="block p-3 w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                // //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <h1>loading...</h1>
              )}
              Sign up
            </Button>

           

         
          </div>
        </form>
      </Form>
    </>
  );
}

export default SignUp;
