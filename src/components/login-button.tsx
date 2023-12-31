"use client";

import type { ReactNode } from "react";

interface LoginButtonProps {
  children: ReactNode;
  mode?: "modal" | "page";
  asChild?: boolean;
}

const LoginButton = (props: LoginButtonProps) => {
  const handleOnClick = () => {
    console.log("Login Button Clicked");
  };

  return <div onClick={handleOnClick}>{props.children}</div>;
};

export default LoginButton;
