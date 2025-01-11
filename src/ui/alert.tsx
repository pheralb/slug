import type { ReactNode } from "react";

import { cn } from "@/utils";
import {
  AlertTriangleIcon,
  CheckIcon,
  CircleXIcon,
  InfoIcon,
} from "lucide-react";

interface AlertProps {
  variant: "error" | "success" | "warning" | "info";
  children: ReactNode;
  className?: string;
  iconClassname?: string;
  iconSize?: number;
}

const Alert = (props: AlertProps) => {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-2.5",
        "rounded-md border-[1.5px] py-3 pl-3 pr-2",
        "not-prose text-sm [&_a]:underline [&_a]:underline-offset-2",
        props.variant === "success" &&
          "border-emerald-600/20 bg-emerald-100/50 text-emerald-900 selection:bg-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 dark:selection:bg-emerald-500/30",
        props.variant === "error" &&
          "border-red-600/20 bg-red-100/50 text-red-900 selection:bg-red-500/20 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200 dark:selection:bg-red-500/30",
        props.variant === "warning" &&
          "border-yellow-600/20 bg-yellow-100/50 text-yellow-900 selection:bg-yellow-500/20 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200 dark:selection:bg-yellow-500/30",
        props.variant === "info" &&
          "border-blue-600/20 bg-blue-100/50 text-blue-900 selection:bg-blue-500/20 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200 dark:selection:bg-blue-500/30",
        props.className,
      )}
    >
      {props.variant === "success" && (
        <CheckIcon
          strokeWidth={1.5}
          className={props.iconClassname}
          size={props.iconSize ?? 18}
        />
      )}
      {props.variant === "error" && (
        <CircleXIcon
          strokeWidth={1.5}
          className={props.iconClassname}
          size={props.iconSize ?? 18}
        />
      )}
      {props.variant === "warning" && (
        <AlertTriangleIcon
          strokeWidth={1.5}
          className={props.iconClassname}
          size={props.iconSize ?? 18}
        />
      )}
      {props.variant === "info" && (
        <InfoIcon
          strokeWidth={1.5}
          className={props.iconClassname}
          size={props.iconSize ?? 18}
        />
      )}
      {props.children}
    </div>
  );
};

export default Alert;
