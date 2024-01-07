import Container from "@/ui/container";
import { ModeToggle } from "./change-theme";
import Logo from "./logo";
import Link from "next/link";
import ExternalLink from "@/ui/external-link";
import { GithubIcon } from "lucide-react";
import { cn } from "@/utils";
import { buttonVariants } from "@/ui/button";
import UserButton from "./auth/user-button";

const Header = () => {
  return (
    <nav
      className={cn(
        "flex w-full border-b border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900",
        "sticky top-0 z-50",
      )}
    >
      <Container>
        <div className="flex w-full items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80 rtl:space-x-reverse"
          >
            <Logo width={30} />
            <span className="self-center whitespace-nowrap text-lg font-medium tracking-tight dark:text-white">
              slug
            </span>
          </Link>
          <div className="flex items-center space-x-1">
            <ExternalLink
              href="https://github.com/pheralb/slug"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <GithubIcon size={20} />
            </ExternalLink>
            <ModeToggle />
            <UserButton />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
