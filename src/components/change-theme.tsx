"use client";

import * as React from "react";
import { Monitor, MoonIcon, Sun, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="space-x-0">
          <SunIcon
            size={20}
            strokeWidth={1.8}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <MoonIcon
            size={20}
            strokeWidth={1.8}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex items-center space-x-3"
          onClick={() => setTheme("light")}
        >
          <Sun size={16} />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center space-x-3"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon size={16} />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center space-x-3"
          onClick={() => setTheme("system")}
        >
          <Monitor size={16} />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
