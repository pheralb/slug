import React from "react";
import { BiInfoCircle } from "react-icons/bi";

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

const Alert = (props: AlertProps) => {
  return (
    <div
      className={`flex border border-rose-400/30 rounded-lg p-4 mb-5 text-sm text-rose-300 bg-rose-500/10 ${props.className}`}
      role="alert"
    >
      <div className="flex items-center">
        <BiInfoCircle className="text-rose-300 mr-2" size={18} />
        {props.children}
      </div>
    </div>
  );
};

export default Alert;
