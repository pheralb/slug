"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Link2Icon, SettingsIcon } from "lucide-react";
import { buttonVariants } from "@/ui/button";

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
        className:
          pathname === route.path ? "bg-gray-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-none" : "",
      })}
    >
      <route.icon size={16} />
      <span>{route.title}</span>
    </Link>
  ));
};

export default DashboardRoutesComponent;
