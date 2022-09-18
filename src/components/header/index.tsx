import Logo from "@/components/icons/logo";
import Link from "@/components/link";
import { IoLogoGithub } from "react-icons/io5";

const Header = () => {
  return (
    <header className="sticky top-0 z-100 w-full py-7">
      <div className="flex items-center justify-between mx-auto">
        <Link href="/">
          <div className="flex items-center">
            <Logo width={22} height={22} />
            <h1 className="text-xl ml-2">urll</h1>
          </div>
        </Link>
        <div className="flex">
          <button className="mr-5">Sign in with Github</button>
          <a
            href="https://github.com/pheralb/urll"
            rel="noreferrer"
            target="_blank"
          >
            <IoLogoGithub size={24} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
