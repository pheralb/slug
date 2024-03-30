import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { cn } from "@/utils";
import { PackageIcon, TriangleAlertIcon } from "lucide-react";

interface LinksLimitProps {
  userLinks: number;
  maxLinks: number;
}

const LinksLimit = ({ userLinks, maxLinks }: LinksLimitProps) => {
  const max = userLinks >= maxLinks;
  const mid = userLinks >= maxLinks / 2;
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex cursor-default items-center justify-end font-mono text-sm">
            <div
              className={cn(
                mid ? "text-yellow-500" : "",
                max ? "text-red-500" : "",
                "flex items-center space-x-2",
              )}
            >
              {max ? (
                <TriangleAlertIcon size={14} />
              ) : (
                <PackageIcon size={14} />
              )}
              <span>
                {userLinks < 10 ? `0${userLinks}` : userLinks}
                {"/"}
                {maxLinks < 10 ? `0${maxLinks}` : maxLinks}
                {" links "}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {max ? (
            <p>You have reached the maximum limit of {maxLinks} links.</p>
          ) : (
            <p>
              You have created {userLinks} out of {maxLinks} links.
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LinksLimit;
