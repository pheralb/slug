import type { NextPage } from "next";

import Link from "@/components/link";
import Up from "@/motions/up";

const Home: NextPage = () => {
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
        <Link href="/create">Create your first link</Link>
      </Up>
    </div>
  );
};

export default Home;
