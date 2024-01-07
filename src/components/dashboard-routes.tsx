"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Link2Icon, SettingsIcon } from "lucide-react";
import { buttonVariants } from "@/ui/button";
import { cn } from "@/utils";

const DashboardRoutes = [
  {
    title: "Links",
    path: "/dashboard",
    icon: Link2Icon,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

const DashboardRoutesComponent = () => {
  const pathname = usePathname();

  return DashboardRoutes.map((route) => (
    <Link
      key={route.path}
      href={route.path}
      className={buttonVariants({
        variant: "ghost",
        className: cn(
          pathname === route.path
            ? "border-b-2 border-indigo-200 bg-gray-100 dark:border-indigo-700 dark:bg-neutral-800/50"
            : "",
          "rounded-none transition-none py-7 px-6 hover:border-b-2 hover:border-neutral-200 dark:hover:border-neutral-700",
        ),
      })}
    >
      <route.icon size={16} />
      <span>{route.title}</span>
    </Link>
  ));
};

export default DashboardRoutesComponent;
