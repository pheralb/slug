import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";

const CreateNewLink = () => {
  return (
    <div className="container mx-auto pt-6">
      <p>⚠️ We are updating Slug services. During the upgrade, the option to create new links is closed. Slug will be operational again shortly.</p>
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
