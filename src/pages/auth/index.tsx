import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { Button } from "@/ui";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsGithub } from "react-icons/bs";

const Auth = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("github", {
        callbackUrl: "/dash",
      });
    } catch (error) {
      toast(
        "An error occurred while logging in. Please create an issue about the problem.",
        {
          icon: "🤔",
          style: {
            borderRadius: "10px",
            background: "#28283E",
            color: "#fff",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center mt-16 px-4">
        <h1 className="text-4xl mb-8">👋 Welcome</h1>
        <Button
          className="ml-4 bg-midnightLight"
          onClick={handleSignIn}
          isLoading={loading}
          loadingText="Loading..."
          icon={<BsGithub size={17} />}
        >
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/dash",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Auth;
