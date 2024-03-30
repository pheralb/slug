import type { ReactNode } from "react";
import { cn } from "@/utils";

export interface BadgeProps {
  children?: ReactNode;
  animate?: boolean;
  className?: string;
}

export const Badge = (props: BadgeProps) => {
  return (
    <span className="relative inline-block overflow-hidden rounded-full p-[1px] font-mono">
      {props.animate && (
        <span
          className={cn(
            "absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f4f4f5_0%,#f4f4f5_50%,#737373_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#121212_0%,#121212_50%,#737373_100%)]",
          )}
        />
      )}
      <div
        className={cn(
          "inline-flex h-full w-full cursor-default items-center justify-center rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-medium dark:border-neutral-800 dark:bg-neutral-900 dark:text-white",
          props.className,
        )}
      >
        {props.children}
      </div>
    </span>
  );
};
