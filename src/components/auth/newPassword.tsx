"use client";

import type { z } from "zod";

import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

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

import Alert from "@/ui/alert";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { sharedAnimationCards } from "./animation-cards";
import { newPasswordSchema } from "@/server/schemas";
import { updatePassword } from "@/server/actions/auth";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");
  const [isError, setError] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  // Submit handler:
  const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
    setMessage("");
    setError(false);
    startTransition(async () => {
      await updatePassword(values, token).then((res) => {
        if (res) {
          setMessage(res?.message);
          setError(res?.isError);
        }
        if (!res.isError) {
          toast.success(res.message);
          router.push("/login");
        }
      });
    });
  };

  return (
    <Card className={sharedAnimationCards}>
      <CardHeader>
        <CardTitle className="text-xl">Reset your password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password:</FormLabel>
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
                <span>Please wait...</span>
              ) : (
                <span>Save new password</span>
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

export default ResetPasswordForm;
