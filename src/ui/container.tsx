import { cn } from "@/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = (props: ContainerProps) => {
  return <section className={cn("max-w-screen-xl w-full mx-auto")}>{props.children}</section>;
};

export default Container;
