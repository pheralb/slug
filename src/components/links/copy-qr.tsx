"use client";

import type { Links } from "@prisma/client";
import QRCode from "react-qr-code";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { DownloadIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

interface CopyQRProps {
  linkInfo: Links;
}

const CopyQR = ({ linkInfo }: CopyQRProps) => {
  const handleDownloadQRImage = (type: "png" | "svg") => {
    const svg = document.getElementById("qr-code");
    const svgData = new XMLSerializer().serializeToString(svg!);
    if (type === "svg") {
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const downloadLink = document.createElement("a");
      downloadLink.download = `${linkInfo.slug}_slug_app.svg`;
      downloadLink.href = window.URL.createObjectURL(svgBlob);
      downloadLink.click();
    } else if (type === "png") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx!.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${linkInfo.slug}_slug_app.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Copy QR Code</DialogTitle>
        <DialogDescription>{linkInfo.description}</DialogDescription>
      </DialogHeader>
      <div className="my-3 flex flex-col items-center justify-center space-y-3 overflow-hidden">
        <div className="rounded-lg border border-neutral-100 p-2 shadow-md dark:border-neutral-800">
          <QRCode
            id="qr-code"
            size={128}
            style={{ height: "auto" }}
            value={`https://slug.vercel.app/${linkInfo.slug}`}
            viewBox={`0 0 128 128`}
          />
        </div>
        <p className="block w-full truncate font-mono text-center font-medium">{`/${linkInfo.slug}`}</p>
      </div>
      <DialogFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <DownloadIcon size={14} />
              <span>Download QR</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleDownloadQRImage("png")}>
              Download as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadQRImage("svg")}>
              Download as SVG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default CopyQR;
