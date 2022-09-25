import { Github } from "@react-symbols/icons";
import Auth from "@/components/auth";
import Logo from "@/components/icons/logo";
import Link from "@/components/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-100 w-full py-4 bg-midnight duration-300 border-b border-midnightLight">
      <div className="flex container items-center justify-between mx-auto">
        <Link href="/">
          <div className="flex items-center hover:-translate-y-0.5 cursor-pointer transition-transform duration-300">
            <Logo width={22} height={22} />
            <h1 className="text-xl ml-2 mr-2">slug</h1>
            <p className="text-gray-500 font-medium">beta</p>
          </div>
        </Link>
        <div className="flex items-center">
          <Auth />
          <a
            href="https://github.com/pheralb/slug"
            rel="noreferrer"
            target="_blank"
            className="hover:transform hover:scale-110 transition duration-200 ease-in-out"
          >
            <Github width={28} height={28} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
