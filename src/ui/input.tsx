import { ComponentProps, FC } from "react";

const Input: FC<ComponentProps<"input">> = (props) => {
  return (
    <input
      className={`rounded-md px-4 py-2 w-full focus:border-none ${props.className}`}
      {...props}
    />
  );
};

export default Input;
