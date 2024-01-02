"use client";

import type z from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

import { loginSchema } from "@/server/schemas";
import { login } from "@/server/actions/auth";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SocialLogin from "@/components/auth/social-login";
import { useState, useTransition } from "react";
import Alert from "@/ui/alert";
import { useSearchParams } from "next/navigation";

const SignIn = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider."
      : "";
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler:
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setMessage("");
    setError(false);
    startTransition(async () => {
      await login(values).then((res) => {
        if (res) {
          setMessage(res?.message);
          setError(res?.isError);
        }
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="youremail@example.com"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="******"
                        type="password"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {message || urlError ? (
              <Alert variant={isError || urlError ? "error" : "success"}>
                {message || urlError}
              </Alert>
            ) : null}
            <Button type="submit" className="w-full" disabled={isPending}>
              <span>Sign In</span>
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          <SocialLogin isPending={isPending} />
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400">
        <p>Don't have an account?</p>
        <Link
          href="/register"
          className="opacity-75 transition-opacity duration-100 hover:text-black hover:opacity-100 dark:hover:text-white"
        >
          <span>Sign Up</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
