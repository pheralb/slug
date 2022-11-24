import { useState } from "react";
import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { FilterLinkInput } from "@/schema/link.schema";
import Loader from "@/motions/loader";

import Card from "@/components/card";
import DashboardLayout from "@/layout/dashboard";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { BiHash, BiRocket, BiSearch } from "react-icons/bi";
import Alert from "@/ui/alert";
import { CardProps } from "@/components/card/interface";
import LinkRoute from "@/ui/linkRoute";
import { Input } from "@/ui";

const Dashboard = () => {
  const { register } = useForm<FilterLinkInput>();
  const [filter, setFilter] = useState("");
  const result = trpc.links.allLinks.useQuery({
    filter,
  });

  return (
    <DashboardLayout>
      <div className="my-6">
        <div className="w-full">
          <Input
            id="filter"
            type="text"
            placeholder="Search links"
            {...register("filter", {})}
            onChange={(e) => setFilter(e.target?.value)}
          />
        </div>
      </div>
      {result.isLoading && (
        <>
          <div className="mt-8 flex flex-col items-center justify-center">
            <p className="mb-2">Loading your links...</p>
            <Loader />
          </div>
        </>
      )}
      {result.error && (
        <Alert>
          <p>{result.error.message}</p>
        </Alert>
      )}
      {result.data && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {result.data.map((link: CardProps) => (
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
      {result.data?.length === 0 && (
        <div className="mt-5 flex flex-col items-center justify-center">
          <BiRocket className="mb-4 text-gray-400" size={64} />
          <p className="mb-4 text-xl">Let's create your first link!</p>
          <LinkRoute href="/dash/create" className="border border-gray-400">
            Create a link
          </LinkRoute>
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
