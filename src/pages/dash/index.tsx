import { useState } from "react";
import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { FilterLinkInput } from "@/schema/link.schema";
import Loader from "@/motions/loader";

import Card from "@/components/card";
import DashboardLayout from "@/layout/dashboard";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { BiSearch } from "react-icons/bi";
import Alert from "@/ui/alert";

const Dashboard = () => {
  const { register } = useForm<FilterLinkInput>();
  const [filter, setFilter] = useState("");
  const { data, error, isLoading } = trpc.links.allLinks.useQuery({
    filter,
  });

  return (
    <DashboardLayout>
      <div className="my-5">
        <div className="flex items-center">
          <div className="relative  w-full">
            <div className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-400">
              <BiSearch size={22} />
            </div>
            <input
              id="filter"
              type="text"
              placeholder="Search"
              className="w-full rounded-md bg-transparent py-2 pl-10 pr-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zinc-700"
              {...register("filter", {})}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <>
          <div className="mt-8 flex flex-col items-center justify-center">
            <p className="mb-2">Loading your links...</p>
            <Loader />
          </div>
        </>
      )}
      {error && (
        <Alert>
          <p>{error.message}</p>
        </Alert>
      )}
      {data
        ?.sort((a: any, b: any) => b.id - a.id)
        .map(
          (link: {
            id: number;
            url: string;
            slug: string;
            description: string;
          }) => (
            <Card
              key={link.id}
              id={link.id}
              url={link.url}
              slug={link.slug}
              description={link.description || "No description"}
              className="mt-3 hover:bg-zinc-900"
            />
          )
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
