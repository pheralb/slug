import { useState, Fragment } from "react";
import { Button } from "@/styles/ui";
import { signIn, signOut, useSession } from "next-auth/react";
import { Transition, Menu } from "@headlessui/react";
import { BiBookmarkAltPlus, BiBox, BiExit, BiHash } from "react-icons/bi";
import Link from "next/link";
import Loader from "@/motions/loader";
import toast from "react-hot-toast";

const Auth = () => {
  const { data: session, status } = useSession();
  const [disabled, setDisabled] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleSignIn = async () => {
    setDisabled(true);
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
      setDisabled(false);
    }
  };

  const handleLogout = async () => {
    setDisabled(true);
    setClosing(true);
    try {
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      toast(
        "An error occurred while logout. Please create an issue about the problem.",
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
      setDisabled(false);
      setClosing(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center ml-2">
        <Loader />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        className="mr-4 bg-midnightLight hover:bg-stone-700"
        onClick={handleSignIn}
      >
        {disabled ? (
          <>
            <Loader />
            Logging in...
          </>
        ) : (
          "Sign in with Github"
        )}
      </Button>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        as={Button}
        className="focus:outline-none focus:ring-2 focus:bg-midnightLight focus:ring-offset-2 mr-4 hover:bg-midnightLight"
      >
        {closing ? (
          <>
            <Loader className="mr-2" />
            Logging out...
          </>
        ) : (
          <>
            <BiHash size={18} className="mr-2" />
            {session?.user?.username}
          </>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute p-1 right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-midnight border border-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <Link href="/dash/create">
                <div className="mb-1 cursor-pointer block rounded text-stone-200 px-4 py-2 text-sm hover:bg-midnightLight duration-200">
                  <BiBookmarkAltPlus className="inline-block mr-3" size={18} />
                  Create new link
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/dash">
                <div className="mb-1 cursor-pointer block rounded text-stone-200 px-4 py-2 text-sm hover:bg-midnightLight duration-200">
                  <BiBox className="inline-block mr-3" size={18} />
                  My links
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <div
                className="cursor-pointer block rounded text-stone-200 px-4 py-2 text-sm hover:bg-midnightLight duration-200"
                onClick={handleLogout}
              >
                <BiExit className="inline-block mr-3" size={18} />
                Sign out
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Auth;
