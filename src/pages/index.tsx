import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import Link from "@/components/link";
import Up from "@/motions/up";
import { BiRocket } from "react-icons/bi";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-20 bg-gradient-to-r transition-all duration-100 from-midnight via-midnightLight to-midnight border-b-2 border-gray-900">
      <Up>
        <h1 className="text-3xl md:text-6xl mb-2 md:mb-3">
          Open-Source Link Shortener
        </h1>
      </Up>
      <Up delay={0.2}>
        <h3 className="text-2xl mb-6 text-gray-400">
          unlimited links & custom slugs
        </h3>
      </Up>
      <Up delay={0.4}>
        <div className="flex flex-col md:flex-row gap-4">
          {(status === "authenticated" && (
            <>
              <Link href="/dash">
                <div className="p-2 cursor-pointer hover:-translate-y-0.5 duration-200 transition-transform bg-midnight rounded-md flex items-center">
                  Go to dashboard
                </div>
              </Link>
            </>
          )) || (
            <>
              <Link href="/api/auth/signin">
                <div className="p-2 cursor-pointer hover:-translate-y-0.5 duration-200 transition-transform bg-midnight rounded-md flex items-center">
                  <BiRocket className="mr-2" />
                  Sign in
                </div>
              </Link>
            </>
          )}
        </div>
      </Up>
    </div>
  );
};

export default Home;
