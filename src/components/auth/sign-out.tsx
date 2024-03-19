"use client";

import { handleSignOut } from "@/server/actions/auth";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

export function SignOut() {
  const iconSize = 15;

  const handleLogout = async () => {
    await handleSignOut();
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOutIcon size={iconSize} />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}
