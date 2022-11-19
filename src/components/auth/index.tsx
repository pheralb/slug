import { useState } from "react";
import { Button } from "@/ui";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  BiBox,
  BiExit,
  BiHash,
  BiMessageSquareEdit,
  BiPlus,
} from "react-icons/bi";
import Link from "next/link";
import toast from "react-hot-toast";
import { Dropdown, DropdownItem } from "@/ui/dropdown";

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
      <Button className="ml-2" disabled isLoading loadingText="Loading..." />
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        className="ml-2"
        disabled={disabled}
        onClick={handleSignIn}
        isLoading={disabled}
        loadingText="Signing in..."
      >
        Sign in with GitHub
      </Button>
    );
  }

  return (
    <Dropdown
      title={session?.user?.username}
      className="bg-transparent"
      icon={<BiHash size={18} />}
    >
      <Link href="/dash/create">
        <DropdownItem icon={<BiPlus size={17} />}>Create new link</DropdownItem>
      </Link>
      <Link href="/dash">
        <DropdownItem icon={<BiBox size={17} />}>Dashboard</DropdownItem>
      </Link>
      <a
        href="https://github.com/pheralb/slug/issues/new"
        target="_blank"
        rel="noreferrer"
      >
        <DropdownItem icon={<BiMessageSquareEdit size={17} />} external={true}>
          Report a bug
        </DropdownItem>
      </a>
      <DropdownItem icon={<BiExit size={17} />} onClick={handleLogout}>
        Sign Out
      </DropdownItem>
    </Dropdown>
  );
};

export default Auth;
