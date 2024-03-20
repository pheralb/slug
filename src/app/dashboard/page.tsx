import type { Metadata } from "next";

import { getLinksByUser } from "@/server/queries";

import CardLink from "@/components/links/card-link";
import LinksLimit from "@/components/links/links-limit";
import SearchLinks from "@/components/links/search-link";
import { CreateLink } from "@/components/links/create-link";
import { Button } from "@/ui/button";
import { PackageOpenIcon, PlusIcon, SparklesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) => {
  const data = await getLinksByUser();
  const query = searchParams?.search;

  if (!data?.links) {
    return <div>Error</div>;
  }

  const filteredLinks = data.links.filter((link) => {
    if (!query) return true;
    return link.slug.includes(query);
  });

  return (
    <main className="duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <div className="mb-2 flex w-full items-center justify-between">
        <SearchLinks className="w-72 max-w-72" />
        <LinksLimit length={data.links.length} />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
        {filteredLinks
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((link) => {
            return <CardLink key={link.id} linkInfo={link} />;
          })}
      </div>
      {filteredLinks.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center space-y-3 text-center">
          {query ? (
            <PackageOpenIcon size={48} strokeWidth={0.5} />
          ) : (
            <SparklesIcon size={48} strokeWidth={0.5} />
          )}
          {query ? (
            <p>
              No links found with <span className="font-mono">{query}</span>{" "}
              slug
            </p>
          ) : (
            <p>Star creating your first link:</p>
          )}
          <CreateLink slug={query}>
            <Button variant="outline">
              <PlusIcon size={14} />
              <span>
                {query
                  ? `Create a link with ${query} slug`
                  : "Create a new link"}
              </span>
            </Button>
          </CreateLink>
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
