import Link from "next/link";
import React from "react";

interface LinkRouteProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const LinkRoute = (props: LinkRouteProps) => {
  return (
    <Link href={props.href}>
      <div
        className={`p-2 cursor-pointer hover:text-gray-300 duration-200 transition-all rounded-md flex items-center ${props.className}`}
      >
        {props.children}
      </div>
    </Link>
  );
};

export default LinkRoute;
