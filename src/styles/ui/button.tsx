import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-midnightLight rounded-md px-4 py-2 hover:bg-slate-800 hover:transition duration-200 ease-in-out focus:outline-none ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
