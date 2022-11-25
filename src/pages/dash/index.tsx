import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { useForm } from "react-hook-form";
import { LinkSchema } from "@/schema/link.schema";

import { FilterLinkInput } from "@/schema/link.schema";

import Loader from "@/motions/loader";
import Card from "@/components/card";
import DashboardLayout from "@/layout/dashboard";

import { BiRocket } from "react-icons/bi";

import Alert from "@/ui/alert";
import LinkRoute from "@/ui/linkRoute";
import { Input } from "@/ui";

const Dashboard = () => {
  const { register } = useForm<FilterLinkInput>();
  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState<LinkSchema[]>([]);
  const [searchLinks, setSearchLinks] = useState("");

  const {
    data: linksData,
    isLoading,
    error,
  } = trpc.links.allLinks.useQuery({
    filter,
  });

  if (error) {
    return (
      <Alert>
        <p>{error.message}</p>
      </Alert>
    );
  }

  const filteredLinks = linksData?.filter((link) => {
    return link.slug.toLowerCase().includes(searchLinks.toLowerCase());
  });

  if (!linksData) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center">
        <p className="mb-2">Loading your links...</p>
        <Loader />
      </div>
    );
  }

  if (links.length === 0 && linksData.length > 0) {
    setLinks(linksData as LinkSchema[]);
  }

  return (
    <DashboardLayout>
      <div className="my-6">
        <div className="w-full">
          <Input
            id="filter"
            type="text"
            placeholder="Search links"
            {...register("filter")}
            onChange={(e) => {
              setSearchLinks(e.target.value);
            }}
          />
        </div>
      </div>
      {links.length === 0 && (
        <div className="mt-5 flex flex-col items-center justify-center">
          <BiRocket className="mb-4 text-gray-400" size={64} />
          <p className="mb-4 text-xl">Lets create your first link!</p>
          <LinkRoute href="/dash/create" className="border border-gray-400">
            Create a link
          </LinkRoute>
        </div>
      )}
      {isLoading && (
        <>
          <div className="mt-8 flex flex-col items-center justify-center">
            <p className="mb-2">Loading your links...</p>
            <Loader />
          </div>
        </>
      )}
      {links && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLinks?.map((link) => (
            <Card
              key={link.id}
              id={link.id}
              url={link.url}
              description={link.description || "No description."}
              slug={link.slug}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Dashboard;
