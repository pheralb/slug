"use client";

import { handleSignOut } from "@/server/actions/auth";
import { DropdownMenuItem } from "@/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

export function SignOut() {
  const iconSize = 15;

  const handleLogout = async () => {
    toast.promise(handleSignOut, {
      loading: "Signing out...",
      error: "Failed to sign out. Please try again.",
    });
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOutIcon size={iconSize} />
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}
