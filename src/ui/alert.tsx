import type { ReactNode } from "react";

import { cn } from "@/utils";
import { AlertCircle, CheckCircle, InfoIcon, XCircleIcon } from "lucide-react";

interface AlertProps {
  variant: "error" | "success" | "warning" | "info";
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  iconSize?: number;
}

const Alert = (props: AlertProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-md p-3 text-sm",
        props.variant === "error" && "dark:text-red-200 dark:bg-red-900/20",
        props.variant === "success" && "dark:text-green-200 dark:bg-green-900/20",
        props.variant === "warning" && "dark:text-yellow-200 dark:bg-yellow-900/20",
        props.variant === "info" && "text-blue-900 dark:text-blue-200 bg-blue-700/20 dark:bg-blue-900/20",
        props.className,
      )}
    >
      <div
        className={cn("flex items-center space-x-2", props.containerClassName)}
      >
        {props.variant === "error" && (
          <XCircleIcon size={20 || props.iconSize} />
        )}
        {props.variant === "success" && (
          <CheckCircle size={20 || props.iconSize} />
        )}
        {props.variant === "warning" && (
          <AlertCircle size={20 || props.iconSize} />
        )}
        {props.variant === "info" && <InfoIcon size={20 || props.iconSize} />}
        <span>{props.children}</span>
      </div>
    </div>
  );
};

export default Alert;
