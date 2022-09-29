import React from "react";

import { trpc } from "@/utils/trpc";
import Loader from "@/motions/loader";

import Card from "@/components/card";
import DashboardLayout from "@/layout/dashboard";
import Messages from "@/components/messages";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

const Dashboard = () => {
  const { data, error, isLoading } = trpc.useQuery(["links.links"]);

  return (
    <DashboardLayout>
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
