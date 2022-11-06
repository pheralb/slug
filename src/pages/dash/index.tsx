import { useState } from "react";
import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { FilterLinkInput } from "@/schema/link.schema";
import Loader from "@/motions/loader";

import Card from "@/components/card";
import DashboardLayout from "@/layout/dashboard";
import Messages from "@/components/messages";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { BiSearch } from "react-icons/bi";

const Dashboard = () => {
  const { register } = useForm<FilterLinkInput>();
  const [filter, setFilter] = useState("");
  const { data, error, isLoading } = trpc.useQuery(["links.links", { filter }]);

  return (
    <DashboardLayout>
      <div className="my-5">
        <div className="flex items-center">
          <div className="relative  w-full">
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400">
              <BiSearch size={22} />
            </div>
            <input
              id="filter"
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-transparent"
              {...register("filter", {})}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <>
          <div className="flex flex-col justify-center items-center mt-8">
            <p className="mb-2">Loading your links...</p>
            <Loader />
          </div>
        </>
      )}
      {error && <Messages text="An error has occurred obtaining the links." />}
      {data
        ?.sort((a, b) => b.id - a.id)
        .map((link) => (
          <Card
            key={link.id}
            url={link.url}
            slug={link.slug}
            description={link.description || "No description"}
            className="mt-3 hover:bg-zinc-900"
          />
        ))}
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
