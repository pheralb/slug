import ExternalLink from "@/ui/external-link";
import { cn } from "@/utils";
import React from "react";
import { XLogo } from "../icons/logos";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer
      className={cn(
        "group w-full text-sm text-neutral-600 animate-in fade-in-25 dark:text-neutral-400",
        "bg-white/60 backdrop-blur-md dark:bg-neutral-900/60",
        props.className,
      )}
    >
      <div className={cn("container flex items-center justify-between")}>
        <div className="flex items-center space-x-2">
          <XLogo className="h-3 w-3" />
          <ExternalLink
            href="https://twitter.com/arosck1"
            className="flex items-center space-x-1"
          >
            <p className="hidden md:block">Twitter</p>
            <ArrowUpRight size={14} />
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
