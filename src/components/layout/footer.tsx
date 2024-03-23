import Container from "@/ui/container";
import ExternalLink from "@/ui/external-link";
import { cn } from "@/utils";
import React from "react";
import { T3Logo, XLogo } from "../icons/logos";
import { ArrowUpRight, Heart } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer
      className={cn(
        "group w-full text-sm text-neutral-600 dark:text-neutral-400 animate-in fade-in-25",
        props.className,
      )}
    >
      <Container className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart
            size={14}
            className="text-red-500 group-hover:transform group-hover:animate-pulse"
          />
          <ExternalLink
            href="https://create.t3.gg/"
            className="flex items-center space-x-1"
          >
            <p>Made by Pablo using</p>
            <T3Logo className="h-4 w-4" />
            <ArrowUpRight size={14} />
          </ExternalLink>
        </div>
        <div className="flex items-center space-x-2">
          <XLogo className="h-3 w-3" />
          <ExternalLink
            href="https://twitter.com/pheralb_"
            className="flex items-center space-x-1"
          >
            <p>Twitter</p>
            <ArrowUpRight size={14} />
          </ExternalLink>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
