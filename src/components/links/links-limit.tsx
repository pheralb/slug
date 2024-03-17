import { cn } from "@/utils";
import { LIMIT_LINKS } from "@/server/limits";
import { PackageIcon } from "lucide-react";

interface LinksLimitProps {
  length: number;
}

const LinksLimit = ({ length }: LinksLimitProps) => {
  const max = length >= LIMIT_LINKS;
  const mid = length >= LIMIT_LINKS / 2;
  return (
    <div className="flex items-center justify-end font-mono text-sm text-neutral-400">
      <div
        className={cn(
          mid ? "text-yellow-500" : "",
          max ? "text-red-500" : "",
          "flex items-center space-x-2",
        )}
      >
        <PackageIcon size={14} />
        <span>
          {length}/{LIMIT_LINKS} links
        </span>
      </div>
    </div>
  );
};

export default LinksLimit;
