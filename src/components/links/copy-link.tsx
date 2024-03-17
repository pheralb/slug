"use client";

import type { ReactNode } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/utils";
import { toast } from "sonner";

interface CopyLinkProps {
  slug: string;
  className?: string;
  icon: ReactNode;
}

const CopyLink = (props: CopyLinkProps) => {
  const [, copy] = useCopyToClipboard();
  const url = "https://slug.vercel.app";

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Link copied to clipboard", {
          description: `${text}`,
        });
      })
      .catch((error) => {
        toast.error(
          "An unexpected error has occurred. Please try again later.",
          {
            description: error,
          },
        );
      });
  };

  return (
    <button
      onClick={handleCopy(`${url}/${props.slug}`)}
      className={cn(props.className)}
    >
      {props.icon}
    </button>
  );
};

export default CopyLink;
