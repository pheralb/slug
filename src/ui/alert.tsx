import type { ReactNode } from "react";

import { cn } from "@/utils";
import { AlertCircle, CheckCircle, InfoIcon, XCircleIcon } from "lucide-react";

interface AlertProps {
  variant: "error" | "success" | "warning" | "info";
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  icon?: ReactNode;
  iconSize?: number;
}

const Alert = (props: AlertProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-md p-3 text-sm",
        props.variant === "error" && "dark:bg-red-900/20 dark:text-red-200",
        props.variant === "success" &&
          "dark:bg-green-900/20 dark:text-green-200",
        props.variant === "warning" &&
          "dark:bg-yellow-900/20 dark:text-yellow-200",
        props.variant === "info" &&
          "bg-blue-700/20 text-blue-900 dark:bg-blue-900/20 dark:text-blue-200",
        props.className,
      )}
    >
      <div
        className={cn("flex items-center space-x-2", props.containerClassName)}
      >
        {props.variant === "error" && !props.icon && (
          <XCircleIcon size={20 || props.iconSize} />
        )}
        {props.variant === "success" && !props.icon && (
          <CheckCircle size={20 || props.iconSize} />
        )}
        {props.variant === "warning" && !props.icon && (
          <AlertCircle size={20 || props.iconSize} />
        )}
        {props.icon}
        {props.variant === "info" && !props.icon && (
          <InfoIcon size={20 || props.iconSize} />
        )}
        <span>{props.children}</span>
      </div>
    </div>
  );
};

export default Alert;
