import React, { ComponentProps } from "react";

const Logo: React.FC<ComponentProps<"svg">> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 30 30"
      xmlSpace="preserve"
      {...props}
    >
      <path
        fill="#fb0"
        d="M24.1 4h-9c-.5 0-1 .2-1.3.5L3.6 14.8c-.7.7-.7 1.9 0 2.6l9 9c.7.7 1.9.7 2.6 0l10.3-10.3c.3-.3.5-.8.5-1.3v-9c0-1-.8-1.8-1.9-1.8zM20 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        className="fill-f498bd"
      ></path>
    </svg>
  );
};

export default Logo;
