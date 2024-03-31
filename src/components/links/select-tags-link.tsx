import type { Tags } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { XIcon } from "lucide-react";

interface SelectTagsLinkProps {
  className?: string;
  tags: Tags[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
}

const SelectTagsLink = (props: SelectTagsLinkProps) => {
  return (
    <div className="space-y-2">
      <p>Add tags to your link:</p>
      <Select onValueChange={(value) => props.onSelectTag(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          {props.tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.id}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {props.selectedTags.length > 0 && (
        <div className="flex items-center overflow-hidden rounded-md border border-neutral-200 p-2 text-sm tracking-tight shadow-sm dark:border-neutral-800">
          {props.selectedTags.map((tag) => (
            <div
              key={tag}
              className="mr-1 flex items-center space-x-2 rounded-md bg-neutral-200 px-2 py-1 dark:bg-neutral-800"
            >
              <span>{props.tags.find((t) => t.id === tag)?.name}</span>
              <button
                type="button"
                className="opacity-50 transition-opacity duration-200 hover:opacity-100"
                onClick={() => props.onDeleteTag(tag)}
              >
                <XIcon size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectTagsLink;
