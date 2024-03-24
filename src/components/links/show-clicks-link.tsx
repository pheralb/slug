import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { formatDate } from "@/utils/formatDate";
import { BarChartIcon } from "lucide-react";

interface ShowClicksProps {
  numberOfClicks: number;
  lastDate: Date | null;
}

const ShowClicks = ({ numberOfClicks, lastDate }: ShowClicksProps) => {
  return (
    <TooltipProvider delayDuration={500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex cursor-default items-center space-x-2 border-r border-neutral-200 pr-2 text-xs dark:border-neutral-800">
            <BarChartIcon size={14} />
            <span className="font-mono">{numberOfClicks} clicks</span>
          </div>
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
