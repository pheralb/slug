import Loader from "@/motions/loader";
import React, { forwardRef } from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      type={props.type}
      disabled={props.disabled || props.isLoading}
      onClick={props.onClick}
      className={`flex items-center rounded-md px-3 p-2 hover:transition duration-200 ease-in-out outline-none ${
        props.className
      } focus:ring-1 focus:ring-offset-1 focus:ring-offset-stone-800 focus:ring-gray-500 hover:text-gray-300 
      ${
        props.disabled || props.isLoading
          ? "bg-zinc-900 cursor-not-allowed"
          : "bg-zinc-800"
      }`}
    >
      {props.isLoading ? (
        <>
          <Loader className="mr-2" />
          {props.loadingText ? props.loadingText : "Loading..."}
        </>
      ) : (
        <div className="flex items-center">
          {props.icon ? <div className="mr-2">{props.icon}</div> : null}
          {props.children}
        </div>
      )}
    </button>
  );
};

export default forwardRef(Button);
