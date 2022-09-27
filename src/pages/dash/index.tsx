import React from "react";

import { trpc } from "@/utils/trpc";
import Loader from "@/motions/loader";

import Card from "@/components/card";
import DashboardLayout from "@/layout/dashboard";

const Dashboard = () => {
  const { data, error, isLoading } = trpc.useQuery(["links.links"]);

  return (
    <DashboardLayout>
      {isLoading && (
        <>
          <div className="flex justify-center items-center mt-8">
            <Loader width={40} height={40} />
          </div>
        </>
      )}
      {error && <p>{JSON.stringify(error)}</p>}
      {data?.map((link) => (
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

export default Dashboard;
