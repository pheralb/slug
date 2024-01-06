"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export const ToasterComponent = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      position="bottom-right"
      className="font-sans"
      style={{
        backgroundColor: theme === "dark" ? "#1f2937" : "#fff",
        color: theme === "dark" ? "#fff" : "#1f2937",
      }}
    />
  );
};
