"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import { useEffect, useState } from "react";
import { Button } from "@/ui/button";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeTheme, Pages, SocialPages } from "./items";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const CommandK = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleRoutePush = async (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const handleExternalRoute = (href: string) => {
    window.open(href, "_blank");
    setOpen(false);
  };

  const handleChangeTheme = (theme: string) => {
    setTheme(theme);
    toast.success(`Theme changed to ${theme}`);
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <SearchIcon size={20} />
        <span className="sr-only">Open Command Search Dialog</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="General">
            {Pages.map((page) => (
              <CommandItem
                key={page.href}
                onSelect={() => handleRoutePush(page.href)}
              >
                <page.icon size={22} strokeWidth={1.5} />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Theme">
            {ChangeTheme.map((theme) => (
              <CommandItem
                key={theme.param}
                onSelect={() => handleChangeTheme(theme.param)}
              >
                <theme.icon size={22} strokeWidth={1.5} />
                <span>{theme.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Social">
            {SocialPages.map((page) => (
              <CommandItem
                key={page.href}
                onSelect={() => handleExternalRoute(page.href)}
              >
                <page.icon width={20} />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandK;
