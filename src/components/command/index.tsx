import { useRouter } from "next/router";
import { useState } from "react";
import { BiCommand, BiPlus } from "react-icons/bi";
import { Command, CommandInput, CommandList, CommandOption } from "superkey";

const data = [
  {
    id: 1,
    name: "Create new link",
    description: "Description 1",
    href: "/dash/create",
    icon: <BiPlus />,
  },
  {
    id: 2,
    name: "My links",
    description: "",
    href: "/dash/create",
    icon: <BiPlus />,
  }
];

const CommandMenu = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const filteredData = value
    ? data.filter((example) =>
        example.name.toLowerCase().includes(value.toLowerCase())
      )
    : data;

  return (
    <>
      <BiCommand
        size={22}
        className="hover:transform text-gray-400 mr-4 cursor-pointer hover:text-gray-100 hover:scale-110 transition duration-200 ease-in-out"
        onClick={() => setOpen(true)}
      />
      <Command
        open={open}
        commandFunction={(action) => {
          setOpen(false);
          router.push(`${action}`);
        }}
        className="bg-midnight text-white border-none"
        overlayClassName="bg-midnight/50 text-white"
      >
        <CommandInput
          placeholder="Search..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
          className="bg-midnight text-white border-b border-zinc-800"
        />
        <CommandList>
          {filteredData.map((action) => (
            <CommandOption key={action.id} value={action.href}>
              <div className="flex items-center space-x-2 hover:bg-slate-800">
                <div className="flex-shrink-0 icon-size-8">{action.icon}</div>
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
