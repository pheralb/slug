import React from "react";

interface InputProps {
  className?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

const Textarea = (props: InputProps) => {
  return (
    <textarea
      id={props.id}
      className={`rounded-md px-4 py-2 w-full focus:border-none ${props.className}`}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
    />
  );
};

export default Textarea;
