"use client";

import type z from "zod";
import { useState, useTransition } from "react";

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

import { registerSchema } from "@/server/schemas";
import { register } from "@/server/actions/auth";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SocialLogin from "@/components/auth/social-login";
import Alert from "@/ui/alert";
import { sharedAnimationCards } from "./animation-cards";
import { Loader } from "lucide-react";

const SignUp = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  // Submit handler:
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setMessage("");
    setError(false);
    startTransition(async () => {
      await register(values).then((res) => {
        if (res.isError) {
          setMessage(res.message);
          setError(res.isError);
        }
        setMessage(res.message);
        setError(res.isError);
      });
    });
  };

  return (
    <Card className={sharedAnimationCards}>
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
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
            {message && (
              <Alert variant={isError ? "error" : "success"}>{message}</Alert>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader className="animate-spin" size={16} /> : null}
              {isPending ? (
                <span>Creating account...</span>
              ) : (
                <span>Create account</span>
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4">
          <SocialLogin />
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400">
        <p>Already have an account?</p>
        <Link
          href="/login"
          className="opacity-75 transition-opacity duration-100 hover:text-black hover:opacity-100 dark:hover:text-white"
        >
          <span>Sign In</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
