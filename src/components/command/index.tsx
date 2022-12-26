import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BiBox, BiCommand, BiMessageSquareEdit, BiPlus } from "react-icons/bi";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { Command, CommandInput, CommandList, CommandOption } from "superkey";

const data = [
  {
    id: 1,
    name: "Create new link",
    href: "/dash/create",
    icon: <BiPlus />,
  },
  {
    id: 2,
    name: "Dashboard",
    href: "/dash",
    icon: <BiBox />,
  },
  {
    id: 3,
    name: "Report a bug",
    href: "https://github.com/pheralb/slug/issues/new",
    icon: <BiMessageSquareEdit />,
  },
  {
    id: 4,
    name: "Repository",
    href: "https://github.com/pheralb/slug",
    icon: <BsGithub />,
  },
  {
    id: 5,
    name: "Twitter",
    href: "https://twitter.com/pheralb_",
    icon: <BsTwitter />,
  },
];

const CommandMenu = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event?: KeyboardEvent) {
      if (event?.key === "k" && (event?.metaKey || event?.ctrlKey)) {
        event?.preventDefault();
        setOpen(!open);
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [open]);

  const filteredData = data.filter((doc) => {
    return doc.name?.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <BiCommand
        size={22}
        className="mr-4 cursor-pointer text-gray-400 transition duration-200 ease-in-out hover:scale-110 hover:transform hover:text-gray-100"
        onClick={() => setOpen(true)}
      />
      <Command
        open={open}
        onClose={() => {
          setOpen(!open);
        }}
        commandFunction={(action) => {
          setOpen(false);
          router.push(`${action}`);
        }}
        className="border border-neutral-800 bg-midnight text-white"
        overlayClassName="bg-midnight/50"
      >
        <CommandInput
          placeholder="Search..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="border-b border-neutral-800 bg-midnight text-white"
        />
        <CommandList className="border-none">
          {filteredData.map((action) => (
            <CommandOption
              key={action.id}
              value={action.href || ""}
              activeClassName="hover:bg-neutral-900"
            >
              <div className="flex items-center space-x-3 py-1">
                <div className="icon-size-8 flex-shrink-0">{action.icon}</div>
                <h1 className="text-gray-100">{action.name}</h1>
              </div>
            </CommandOption>
          ))}
        </CommandList>
      </Command>
    </>
  );
};

export default CommandMenu;
