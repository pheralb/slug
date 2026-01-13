import type { LinkTags, Links, Tags } from "@/generated/client";

import { formatDate } from "@/utils/formatDate";
import {
  ChevronDownIcon,
  CopyIcon,
  QrCodeIcon,
  SettingsIcon,
  TrashIcon,
  LockIcon,
  TimerIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import { Dialog, DialogTrigger } from "@/ui/dialog";
import ExternalLink from "@/ui/external-link";

import CopyQR from "./copy-qr";
import DeleteLink from "./delete-link";
import EditLink from "./edit-link";
import ShowClicks from "./show-clicks-link";
import CopyLinkDropdown from "./copy-link";
import { cn } from "@/utils";

interface CardLinkProps {
  linkInfo: Links;
  linkTags: LinkTags[];
  tagsInfo: Tags[];
}

const CardLink = ({ linkInfo, linkTags, tagsInfo }: CardLinkProps) => {
  const cardTagsInfo = tagsInfo.filter((tag) =>
    linkTags.some((linkTag) => linkTag.tagId === tag.id),
  );

  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-200 p-3 shadow-sm dark:border-neutral-800">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <ExternalLink
          href={`/${linkInfo.slug}`}
          className="block  space-x-[1px] overflow-hidden truncate font-medium transition-opacity duration-75 hover:opacity-80"
        >
          <span className="text-sm opacity-40">/</span>
          <span>{linkInfo.slug}</span>
        </ExternalLink>
        <div className="flex items-center space-x-3">
          <ShowClicks
            numberOfClicks={linkInfo.clicks}
            lastDate={linkInfo.lastClicked}
            className="hidden border-r border-neutral-200 pr-2 dark:border-neutral-800 md:flex"
          />
          {/* 
            Radix Dialog + DropdownMenu bug 🥺
            https://github.com/radix-ui/primitives/issues/1836
          */}
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="transition-opacity hover:opacity-75">
                <CopyIcon size={15} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <CopyLinkDropdown slug={linkInfo.slug} />
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <QrCodeIcon size={15} />
                    <span>Copy QR Code</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <CopyQR linkInfo={linkInfo} />
          </Dialog>
          <EditLink
            trigger={
              <button className="transition-opacity hover:opacity-75">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <SettingsIcon size={16} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
            }
            link={linkInfo}
            linkTags={cardTagsInfo}
            allTags={tagsInfo}
          />
          <DeleteLink
            link={linkInfo}
            trigger={
              <button className="transition-opacity hover:opacity-75">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <TrashIcon size={16} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </button>
            }
          />
        </div>
      </div>
      <p
        className="mb-2 truncate select-all font-mono text-sm text-neutral-500 dark:text-neutral-400"
        title={linkInfo.url}
      >
        {linkInfo.url}
      </p>
      <Collapsible>
        <div className="flex items-center justify-between font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400 md:space-x-2">
          <div className="flex max-w-[75%] items-center space-x-2">
            {linkTags.length > 0 && (
              <div className="flex cursor-default items-center space-x-1">
                {linkTags.map((tag) => {
                  const tagInfo = tagsInfo.find((t) => t.id === tag.tagId);
                  return (
                    <span
                      key={tag.tagId}
                      className={cn(
                        "rounded-md border border-neutral-200 px-2 py-[0.5px] font-mono text-xs  dark:border-neutral-800",
                      )}
                    >
                      {tagInfo?.name}
                    </span>
                  );
                })}
              </div>
            )}
            <p
              className="hidden truncate md:block"
              title={linkInfo.description ?? ""}
            >
              {linkInfo.description}
            </p>
            <CollapsibleTrigger className="flex items-center transition-colors hover:text-neutral-900 dark:hover:text-white md:hidden">
              <ChevronDownIcon size={14} className="mr-2" />
              <span>Info</span>
            </CollapsibleTrigger>
          </div>
          <div className="flex items-center space-x-2">
            {linkInfo.password && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <LockIcon size={12} className="text-neutral-500" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Protected link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {linkInfo.expiresAt && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <TimerIcon size={12} className="text-neutral-500" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {new Date(linkInfo.expiresAt) < new Date()
                        ? `Expired on ${new Date(linkInfo.expiresAt).toLocaleString()}`
                        : `Will expire on ${new Date(linkInfo.expiresAt).toLocaleString()}`}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <p>{formatDate(linkInfo.createdAt)}</p>
          </div>
        </div>
        <CollapsibleContent className="flex flex-col">
          <div className="my-2 p-2 shadow-sm">
            <ShowClicks
              numberOfClicks={linkInfo.clicks}
              lastDate={linkInfo.lastClicked}
            />
          </div>
          {linkInfo.description && (
            <div className="p-2 shadow-sm">
              <p
                className="text-pretty text-sm"
                title={linkInfo.description ?? ""}
              >
                {linkInfo.description}
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CardLink;
