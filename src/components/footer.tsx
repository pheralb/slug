import Container from "@/ui/container";
import { cn } from "@/utils";
import React from "react";

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer className={cn("w-full", props.className)}>
      <Container className="flex items-center justify-between">
        <p>Crafted with ❤️ by pheralb</p>
        <div></div>
      </Container>
    </footer>
  );
};

export default Footer;
