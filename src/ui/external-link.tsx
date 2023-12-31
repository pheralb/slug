import type { ReactNode } from "react";
import { cn } from "@/utils";

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
}

const ExternalLink = (props: Props) => {
  return (
    <a
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className={cn(props.className)}
    >
      {props.children}
    </a>
  );
};

export default ExternalLink;
