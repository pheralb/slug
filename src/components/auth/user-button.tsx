import Link from "next/link";

import { auth } from "@/auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { buttonVariants } from "@/ui/button";
import Avatar from "boring-avatars";
import UserMenu from "./user-menu";
import { ArrowRight } from "lucide-react";

export default async function UserButton() {
  const session = await auth();

  // If the user is not logged in, show a sign in button:
  if (!session?.user)
    return (
      <Link
        href="/login"
        className={buttonVariants({
          variant: "secondary",
          className: "group",
        })}
      >
        <span>Get Started</span>
        <ArrowRight
          size={15}
          className="duration-200 group-hover:translate-x-[2px]"
        />
      </Link>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        {session.user.name && (
          <Avatar size={22} name={session.user.name} variant="beam" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-neutral-400">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserMenu />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
