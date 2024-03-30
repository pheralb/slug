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
        style: {
          background: theme === "dark" ? "#171717" : "#f3f4f6",
          color: theme === "dark" ? "#f5f5f5" : "#1f2937",
          borderColor: theme === "dark" ? "#262626" : "#e5e7eb",
        },
        classNames: {
          toast: "font-sans",
          description: "font-mono",
        },
      }}
    />
  );
};
