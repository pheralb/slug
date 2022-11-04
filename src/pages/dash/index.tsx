import React from "react";
import { useForm } from "react-hook-form";

import { trpc } from "@/utils/trpc";
import { FilterLinkInput } from "@/schema/link.schema";
import Loader from "@/motions/loader";

import Card from "@/components/card";
import DashboardLayout from "@/layout/dashboard";
import Messages from "@/components/messages";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

const Dashboard = () => {
  const {
    register,
  } = useForm<FilterLinkInput>();
  const [filter, setFilter] = React.useState('');
  const { data, error, isLoading } = trpc.useQuery(["links.links", { filter }]);

  return (
    <DashboardLayout>
      <div className="my-5">
        <div className="flex items-center justify-between mt-1">
          <input
            id="filter"
            type="text"
            placeholder="Search"
            className="rounded-md px-4 py-2 w-full focus:border-none bg-midnightLight text-white"
            {...register("filter", {})}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      {isLoading && (
        <>
          <div className="flex flex-col justify-center items-center mt-8">
            <p className="mb-2">Loading your links...</p>
            <Loader width={40} height={40} />
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
            className="mt-3"
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
