"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import SocialLogin from "./social-login";
import Link from "next/link";

const Register = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <SocialLogin />
      </CardContent>
      <CardFooter className="flex items-center space-x-1 text-sm text-neutral-600 dark:text-neutral-400">
        <p>You have an account?</p>
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

export default Register;