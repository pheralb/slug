import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { cn } from "@/utils";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <main
      className={cn(
        "mt-20 flex w-full flex-col items-center justify-center space-y-8",
      )}
    >
      <h2 className="font-headings text-5xl duration-300 animate-in fade-in-15 slide-in-from-bottom-5">
        Start creating short links
      </h2>
      <div className="flex flex-col items-center justify-center">
        {props.children}
      </div>
    </main>
  );
};

export default AuthLayout;
