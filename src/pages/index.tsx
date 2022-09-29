import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import Link from "@/components/link";
import Up from "@/motions/up";
import { BiRocket, BiStar } from "react-icons/bi";
import LinkRoute from "@/styles/ui/linkRoute";
import Loader from "@/motions/loader";

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
        <div className="flex">
          <LinkRoute href="/dash">
            <BiRocket className="mr-2" />
            Getting Started
          </LinkRoute>
          <a
            href="https://github.com/pheralb/slug"
            target="_blank"
            className="flex items-center hover:text-gray-300 duration-200 transition-all ml-6"
          >
            <BiStar className="mr-2" />
            Star on GitHub
          </a>
        </div>
      </Up>
    </div>
  );
};

export default Home;
