"use client";

import { downloadAllLinks } from "@/server/actions/links";
import { Button } from "@/ui/button";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DownloadAllLinks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownloadLinks = async () => {
    setIsLoading(true);
    try {
      const links = await downloadAllLinks();
      const blob = new Blob([JSON.stringify(links)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "slug-links.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Links exported successfully.");
    } catch (error) {
      toast.error("Failed to download links.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleDownloadLinks}
      disabled={isLoading}
    >
      <DownloadIcon size={14} />
      <span>Export Links</span>
    </Button>
  );
};

export default DownloadAllLinks;
