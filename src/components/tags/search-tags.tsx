"use client";

import type { Tags } from "@prisma/client";
import type { ReactNode } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { CreateTag } from "./create-tag";
import { Button } from "@/ui/button";
import { CheckIcon, PlusIcon, SearchXIcon } from "lucide-react";

interface SearchTagProps {
  tags: Tags[];
  tagSelected: string;
  children: ReactNode;
}

const SearchTag = (props: SearchTagProps) => {
  const searchTagParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchTag = (value: string) => {
    const params = new URLSearchParams(searchTagParams);
    if (value) {
      params.set("tag", value);
    } else {
      params.delete("tag");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleDeleteTag = () => {
    const params = new URLSearchParams(searchTagParams);
    params.delete("tag");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent>
        <p className="text-center my-2 font-medium">My Tags ({props.tags.length})</p>
        <div className="mb-2 flex w-full flex-col space-y-1">
          {props.tags.map((tag) => {
            return (
              <button
                key={tag.id}
                value={tag.id}
                onClick={() => handleSearchTag(tag.id)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-sm transition-colors duration-200 hover:opacity-80"
                style={{
                  backgroundColor: tag.color
                    ? `${tag.color}`
                    : "rgba(23, 23, 23, 0.5)" || "#171717",
                  color: tag.color ? "#fff" : "#171717",
                }}
              >
                <span>{tag.name}</span>
                {tag.id === props.tagSelected && <CheckIcon size={16} />}
              </button>
            );
          })}
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="outline" onClick={handleDeleteTag}>
            <SearchXIcon size={16} />
            <span>Clear search</span>
          </Button>
          <CreateTag tagsCreated={props.tags}>
            <Button variant="outline" className="w-full">
              <PlusIcon size={16} />
              <span>Create Tag</span>
            </Button>
          </CreateTag>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchTag;
