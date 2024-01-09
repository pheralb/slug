import ShowLinks from "@/components/links/show-links";
import { getLinksByUser } from "@/server/actions/links";

const DashboardPage = async () => {
  const getLinks = await getLinksByUser();

  if (!getLinks) {
    return <div>Error</div>;
  }

  return <ShowLinks links={getLinks} />;
};

export default DashboardPage;
