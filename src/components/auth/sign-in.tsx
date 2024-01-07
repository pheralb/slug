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
import { sharedAnimationCards } from "./animation-cards";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const SignIn = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider."
      : "";
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const [isTwoFactor, setTwoFactor] = useState<boolean>(false);

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
      await login(values)
        .then((res) => {
          console.log("otra vez");
          if (res?.isError) {
            setMessage(res?.message);
            setError(res?.isError);
          }
          if (!res?.isError) {
            toast.success("Welcome back!", {
              description: "We're preparing your dashboard...",
            });
            setError(res?.isError ?? false);
          }
          if (res?.twoFactorTokenForm) {
            setTwoFactor(true);
          }
        })
        .catch(() => {
          setError(true);
          setMessage("Something went wrong. Please try again.");
        });
    });
  };

  return (
    <Card className={sharedAnimationCards}>
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              {isTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="duration-300 animate-in fade-in-15 slide-in-from-bottom-3">
                      <FormLabel>Enter your 2FA code:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123456"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {!isTwoFactor && (
                <>
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
                        <div className="flex w-full items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/reset"
                            className="text-xs opacity-75 transition-opacity duration-100 hover:text-black hover:opacity-100 dark:hover:text-white"
                          >
                            <span>Forgot password?</span>
                          </Link>
                        </div>
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
                </>
              )}
            </div>
            {message || urlError ? (
              <Alert variant={isError || urlError ? "error" : "success"}>
                {message || urlError}
              </Alert>
            ) : null}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader className="animate-spin" size={16} /> : null}
              {isTwoFactor ? <span>Verify</span> : <span>Sign In</span>}
            </Button>
          </form>
        </Form>
        {!isTwoFactor ? (
          <div className="mt-4">
            <SocialLogin isPending={isPending} />
          </div>
        ) : null}
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
