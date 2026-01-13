"use client";

import { useState } from "react";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { cn } from "@/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { RefreshCcw, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface SearchLinksProps {
  className?: string;
}

const SearchLinks = (props: SearchLinksProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      if (e.target.value) {
        params.set("search", e.target.value);
      } else {
        params.delete("search");
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  return (
    <div className={cn("flex w-full items-center space-x-2", props.className)}>
      <div className="relative w-full">
        <SearchIcon
          className="absolute left-2 top-1/2 -translate-y-1/2 transform text-neutral-400"
          size={16}
        />
        <Input
          type="search"
          autoComplete="off"
          placeholder="Search links"
          className="pl-8"
          onChange={handleSearch}
          defaultValue={searchParams.get("search")?.toString()}
        />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsRefreshing(true);
                router.refresh();
                setTimeout(() => setIsRefreshing(false), 1000);
              }}
              className="h-9 w-9 shrink-0 overflow-hidden"
            >
              <RefreshCcw
                size={16}
                className={cn(
                  isRefreshing && "animate-spin"
                )}
                style={
                  isRefreshing
                    ? {
                      animationDirection: "reverse",
                      willChange: "transform",
                      backfaceVisibility: "hidden"
                    }
                    : undefined
                }
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SearchLinks;
