"use client";

import ExternalLink from "@/ui/external-link";
import { Input } from "@/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface LinksProps {
  id: number;
  url: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  creatorId: string;
  tagId: number | null;
}

interface ShowLinksProps {
  links: LinksProps[];
}

const ShowLinks = (props: ShowLinksProps) => {
  const [links, setLinks] = useState<LinksProps[]>(props.links);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    const filteredLinks = props.links.filter((link) => {
      return link.slug.toLowerCase().includes(search.toLowerCase());
    });
    setLinks(filteredLinks);
  };

  return (
    <>
      <div className="relative mb-2 w-full">
        <SearchIcon
          size={16}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform opacity-50"
        />
        <Input onChange={handleSearch} placeholder="Search" className="pl-9" />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
        {links
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((link) => {
            return (
              <div
                key={link.id}
                className="flex w-full flex-col rounded-md border border-neutral-200 p-3 dark:border-neutral-800"
              >
                <ExternalLink
                  href={`/${link.slug}`}
                  className="font-medium transition-opacity duration-75 hover:opacity-80"
                >
                  /{link.slug}
                </ExternalLink>
                <p className="truncate font-mono text-sm opacity-60">
                  {link.url}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ShowLinks;
