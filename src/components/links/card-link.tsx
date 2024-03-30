import type { Links } from "@prisma/client";

import { formatDate } from "@/utils/formatDate";
import {
  ChevronDownIcon,
  CopyIcon,
  QrCodeIcon,
  SettingsIcon,
  TrashIcon,
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
import { Dialog, DialogTrigger } from "@/ui/dialog";
import ExternalLink from "@/ui/external-link";

import CopyQR from "./copy-qr";
import DeleteLink from "./delete-link";
import EditLink from "./edit-link";
import ShowClicks from "./show-clicks-link";
import CopyLinkDropdown from "./copy-link";

interface CardLinkProps {
  linkInfo: Links;
}

const CardLink = ({ linkInfo }: CardLinkProps) => {
  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-200 p-3 shadow-sm dark:border-neutral-800">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <ExternalLink
          href={`/${linkInfo.slug}`}
          className="flex items-center space-x-[1px] font-medium transition-opacity duration-75 hover:opacity-80"
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
                <SettingsIcon size={16} />
              </button>
            }
            link={linkInfo}
          />
          <DeleteLink
            link={linkInfo}
            trigger={
              <button className="transition-opacity hover:opacity-75">
                <TrashIcon size={16} />
              </button>
            }
          />
        </div>
      </div>
      <p
        className="mb-2 truncate font-mono text-sm text-neutral-500 dark:text-neutral-400"
        title={linkInfo.url}
      >
        {linkInfo.url}
      </p>
      <Collapsible>
        <div className="flex items-center justify-between font-mono text-xs font-medium text-neutral-600 dark:text-neutral-500 md:space-x-2">
          <p
            className="hidden max-w-[75%] truncate md:block"
            title={linkInfo.description ?? ""}
          >
            {linkInfo.description}
          </p>
          <CollapsibleTrigger className="flex items-center transition-colors hover:text-neutral-900 dark:hover:text-white md:hidden">
            <ChevronDownIcon size={14} className="mr-2" />
            <span>Info</span>
          </CollapsibleTrigger>
          <p>{formatDate(linkInfo.createdAt)}</p>
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
