import React from "react";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Create from "@/components/create";

const CreateNewLink = () => {
  return (
    <div className="container mx-auto pt-6">
      <Create />
    </div>
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

export default CreateNewLink;
