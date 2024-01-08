import ShowLinks from "@/components/links/show-links";
import { api } from "@/server/trpc/server";

const DashboardPage = async () => {
  const getQuery = await api.linksRouter.allLinks.query();

  if (!getQuery) {
    return <div>Error</div>;
  }

  return <ShowLinks links={getQuery} />;
};

export default DashboardPage;
