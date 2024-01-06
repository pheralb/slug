"use client";

import type { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
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

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sharedAnimationCards } from "./animation-cards";
import { resetSchema } from "@/server/schemas";
import { login, resetAccount } from "@/server/actions/auth";
import Alert from "@/ui/alert";

const AuthReset = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const [sendEmail, setSendEmail] = useState<boolean>(false);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  // Submit handler:
  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    setMessage("");
    setError(false);
    startTransition(async () => {
      await resetAccount(values).then((res) => {
        if (res) {
          setMessage(res?.message);
          setError(res?.isError);
        }
        if (!res.isError) {
          setSendEmail(true);
        }
      });
    });
  };

  return (
    <Card className={sharedAnimationCards}>
      <CardHeader>
        <CardTitle className="text-xl">Forgot your password?</CardTitle>
        <CardDescription>
          Don't worry, we will send you an email to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-5">
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
            </div>
            {message && (
              <Alert variant={isError ? "error" : "success"}>{message}</Alert>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader className="animate-spin" size={16} /> : null}
              {isPending ? (
                <span>Please wait...</span>
              ) : (
                <span>Send reset email</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Link
          href="/login"
          className="flex items-center space-x-2 text-sm text-neutral-600 opacity-75 transition-opacity duration-100 hover:text-black hover:opacity-100 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Sign In</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuthReset;
