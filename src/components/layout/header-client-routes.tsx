"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const headerClientClassname =
  "text-sm text-neutral-700 hover:opacity-80 dark:text-neutral-300 transition-opacity";

const HeaderClientRoutes = () => {
  const pathname = usePathname();
  return (
    <>
      <Link
        href="/docs/getting-started"
        className={cn(
          headerClientClassname,
          pathname.includes("/docs") &&
            "font-medium underline underline-offset-8 dark:text-white  dark:decoration-neutral-600",
        )}
      >
        Docs
      </Link>
    </>
  );
};

export default HeaderClientRoutes;
