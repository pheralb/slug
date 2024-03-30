"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export const ToasterComponent = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      position="bottom-right"
      theme={theme === "dark" ? "dark" : "light"}
      toastOptions={{
        classNames: {
          toast:
            "font-sans dark:bg-[#171717] bg-[#f3f4f6] text-[#1f2937] dark:text-[#f5f5f5] dark:border-[#262626]",
          description: "font-mono",
          closeButton: "dark:bg-[#262626] dark:hover:bg-[#464646]",
        },
      }}
    />
  );
};
