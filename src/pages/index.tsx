import Link from "@/components/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <h1 className="text-3xl md:text-6xl mb-2 md:mb-3">A URL shortener</h1>
      <h3 className="text-2xl mb-6 text-gray-400">Create your own short links easy</h3>
      <Link href="/create">
        Create your first link
      </Link>
    </div>
  );
};

export default Home;
