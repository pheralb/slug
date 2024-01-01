import type { ReactNode } from "react";

import { cn } from "@/utils";
import { AlertCircle, CheckCircle, InfoIcon, XCircleIcon } from "lucide-react";

interface AlertProps {
  variant: "error" | "success" | "warning" | "info";
  children: ReactNode;
}

const Alert = (props: AlertProps) => {
  return (
    <div
      className={cn(
        "flex w-full items-center space-x-2 p-3 text-sm rounded-md",
        props.variant === "error" && "bg-red-50 text-red-700",
        props.variant === "success" && "bg-green-50 text-green-700",
        props.variant === "warning" && "bg-yellow-50 text-yellow-700",
        props.variant === "info" && "bg-blue-50 text-blue-700",
      )}
    >
      {props.variant === "error" && <XCircleIcon size={20} />}
      {props.variant === "success" && <CheckCircle size={20} />}
      {props.variant === "warning" && <AlertCircle size={20} />}
      {props.variant === "info" && <InfoIcon size={20} />}
      <span>{props.children}</span>
    </div>
  );
};

export default Alert;
