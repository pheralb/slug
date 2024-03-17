import { cn } from "@/utils";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = (props: ContainerProps) => {
  return (
    <section
      className={cn("container mx-auto w-full", props.className)}
    >
      {props.children}
    </section>
  );
};

export default Container;
