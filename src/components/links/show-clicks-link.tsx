import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { cn } from "@/utils";
import { formatDate } from "@/utils/formatDate";
import { BarChartIcon } from "lucide-react";

interface ShowClicksProps {
  numberOfClicks: number;
  lastDate: Date | null;
  className?: string;
}

const ShowClicks = ({
  numberOfClicks,
  lastDate,
  className,
}: ShowClicksProps) => {
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            "flex cursor-default items-center space-x-2 text-xs",
            className,
          )}
        >
          <BarChartIcon size={14} />
          <span className="font-mono">{numberOfClicks} clicks</span>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          {lastDate ? (
            <p>Last clicked: {formatDate(lastDate)}</p>
          ) : (
            <p>No clicks yet</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShowClicks;
