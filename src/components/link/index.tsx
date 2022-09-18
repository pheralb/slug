import React from "react";
import NextLink from "next/link";

interface LinksProps {
  href: string;
  children: React.ReactNode;
}

const Link = (props: LinksProps) => {
  return (
    <NextLink href={props.href} passHref>
      {props.children}
    </NextLink>
  );
};

export default Link;
