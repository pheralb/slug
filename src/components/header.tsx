import Container from "@/ui/container";
import { ModeToggle } from "./change-theme";
import Logo from "./logo";
import Link from "next/link";
import ExternalLink from "@/ui/external-link";
import { cn } from "@/utils";
import { buttonVariants } from "@/ui/button";
import UserButton from "./auth/user-btn";
import { Badge } from "@/ui/badge";
import { GithubLogo } from "./logos";

const Header = () => {
  return (
    <nav
      className={cn(
        "flex w-full bg-white dark:bg-neutral-900",
        "sticky top-0 z-50",
      )}
    >
      <Container>
        <div className="flex w-full items-center justify-between pb-2 pt-4">
          <Link
            href="/"
            className="flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
          >
            <Logo width={30} />
            <span className="self-center whitespace-nowrap text-lg font-medium tracking-tight dark:text-white">
              slug
            </span>
            <Badge className="cursor-pointer">beta</Badge>
          </Link>
          <div className="flex items-center space-x-1">
            <ExternalLink
              href="https://github.com/pheralb/slug"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <GithubLogo width={20} />
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
