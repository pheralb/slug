import { getLinksByUser } from "@/server/queries";

import CardLink from "@/components/links/card-link";
import LinksLimit from "@/components/links/links-limit";
import SearchLinks from "@/components/links/search-link";

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

  return (
    <>
      <div className="mb-2 flex w-full items-center justify-between">
        <SearchLinks className="w-72 max-w-72" />
        <LinksLimit length={data.links.length} />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
        {data.links
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .filter((link) => {
            if (!query) return true;
            return link.slug.includes(query);
          })
          .map((link) => {
            return <CardLink key={link.id} linkInfo={link} />;
          })}
      </div>
    </>
  );
};

export default DashboardPage;
