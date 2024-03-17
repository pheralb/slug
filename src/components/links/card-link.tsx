import type { Links } from "@prisma/client";

import ExternalLink from "@/ui/external-link";
import { formatDate } from "@/utils/formatDate";
import EditLink from "./edit-link";
import { CopyIcon, SettingsIcon } from "lucide-react";
import CopyLink from "./copy-link";

interface CardLinkProps {
  linkInfo: Links;
}

const CardLink = ({ linkInfo }: CardLinkProps) => {
  return (
    <div className="flex w-full flex-col rounded-md border border-neutral-200 p-3 shadow-sm dark:border-neutral-800">
      <div className="flex w-full items-center justify-between space-x-2">
        <ExternalLink
          href={`/${linkInfo.slug}`}
          className="flex items-center space-x-[1px] font-medium transition-opacity duration-75 hover:opacity-80"
        >
          <span className="text-sm opacity-40">/</span>
          <span>{linkInfo.slug}</span>
        </ExternalLink>
        <div className="flex items-center space-x-3">
          <CopyLink
            className="transition-opacity hover:opacity-75"
            slug={linkInfo.slug}
            icon={<CopyIcon size={15} />}
          />
          <EditLink
            trigger={
              <button className="transition-opacity hover:opacity-75">
                <SettingsIcon size={16} />
              </button>
            }
            link={linkInfo}
          />
        </div>
      </div>
      <p
        className="mb-2 truncate font-mono text-sm text-neutral-500 dark:text-neutral-400"
        title={linkInfo.url}
      >
        {linkInfo.url}
      </p>
      <div className="flex items-center justify-end">
        <p className="font-mono text-xs font-medium text-neutral-600 dark:text-neutral-500">
          {formatDate(linkInfo.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default CardLink;
