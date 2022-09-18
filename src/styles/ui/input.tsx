import React from "react";

interface InputProps {
  className?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className={`bg-midnightLight rounded-md px-4 py-2 w-full focus:border-none ${props.className}`}
    />
  );
};

export default Input;
