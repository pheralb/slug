"use client";

import { logout } from "@/server/actions/auth";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import {
  ArrowUpRight,
  BugIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { XLogo } from "../logos";

const UserMenu = () => {
  const iconSize = 15;

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <>
      <DropdownMenuItem asChild>
        <Link href="/dashboard">
          <LayoutDashboardIcon size={iconSize} />
          <span>Dashboard</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/settings">
          <SettingsIcon size={iconSize} />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link
          href="https://github.com/pheralb/slug/issues/new/choose"
          target="_blank"
        >
          <div className="flex items-center space-x-3">
            <BugIcon size={iconSize} />
            <span>Report a bug</span>
          </div>
          <ArrowUpRight size={iconSize} className="opacity-40" />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem
        asChild
        className="flex w-full items-center justify-between"
      >
        <Link href="https://twitter.com/pheralb_" target="_blank">
          <div className="flex items-center space-x-3">
            <XLogo width={iconSize} />
            <span>Contact</span>
          </div>
          <ArrowUpRight size={iconSize} className="opacity-40" />
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleSignOut}>
        <LogOutIcon size={iconSize} />
        <span>Sign Out</span>
      </DropdownMenuItem>
    </>
  );
};

export default UserMenu;
