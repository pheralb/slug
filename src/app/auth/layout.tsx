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
      <div className="flex flex-col items-center justify-center">
        {props.children}
      </div>
    </main>
  );
};

export default AuthLayout;
