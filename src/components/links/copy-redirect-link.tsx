"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "sonner";

import { Button } from "@/ui/button";
import { ClipboardIcon } from "lucide-react";

interface CopyLinkProps {
  slug: string;
  className?: string;
}

const CopyRedirectLink = (props: CopyLinkProps) => {
  const [, copy] = useCopyToClipboard();

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
    <Button
      size="sm"
      className="space-x-2"
      onClick={handleCopy(`${props.slug}`)}
    >
      <ClipboardIcon size={15} />
      <span>Copy URL</span>
    </Button>
  );
};

export default CopyRedirectLink;
