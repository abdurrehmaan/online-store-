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

const prodcutZodSchema = z.object({
  name: z.string().min(1, { message: "name is required." }),
  image: z.string().min(1, { message: "image is required." }),
  description: z.string().min(1, { message: "descriptione is required." }),
  countInStock: z.string().min(1, { message: "countInStock is required." }),
  price: z.string().min(1, { message: "price on card is required." }),
});

function AddProdcut() {
  const [addProductPromis] = useAddProductMutation();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof prodcutZodSchema>>({
    resolver: zodResolver(prodcutZodSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      countInStock: "",
      price: "",
    },
  });

  async function onSubmit(values: z.infer<typeof prodcutZodSchema>) {
    try {
      console.log(values);

      const payload = {
        name: values.name,
        image: values.image,
        description: "Iphone",
        rating: 4,
        numReview: 0,
        countInStock: 5,
        price: 5000,
        review: [],
      };

      const prodcutinfo = await addProductPromis(payload);

      push(`/`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-lg font-bold text-gray-900">Add new Product</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
          >
            <div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <div className="mt-1">
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
                  </div>

                  <div>
                    <div className="mt-1">
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image Url</FormLabel>
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
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
                        name="countInStock"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Count In Stock</FormLabel>
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
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
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

              <button
                type="submit"
                className="w-full rounded-md border border-transparent  mt-10 bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Add Product
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AddProdcut;
