import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import Auth from "@/components/auth";
import IconButton from "@/ui/iconButton";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full py-4 bg-midnight duration-300">
      <div className="flex container pl-4 pr-4 md:pl-0 md:pr-0 items-center justify-between mx-auto">
        <Link href="/">
          <div className="flex items-center cursor-pointer text-white hover:text-gray-300 transition-all">
            <img src="/img/logo.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl ml-2 mr-2">slug</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <Auth />
          <a
            href="https://github.com/pheralb/slug"
            rel="noreferrer"
            target="_blank"
          >
            <IconButton icon={<BsGithub size={20} />} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
