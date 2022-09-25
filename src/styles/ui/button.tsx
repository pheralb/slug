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
      className={`flex items-center rounded-md px-4 py-2 hover:transition duration-200 ease-in-out focus:outline-none ${props.className} focus:ring-1 focus:ring-offset-1 focus:ring-offset-stone-800 focus:ring-gray-500`}
    >
      {props.children}
    </button>
  );
};

export default Button;
