import Container from "@/ui/container";
import type { ReactNode } from "react";

interface LayoutDocsProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutDocsProps) => {
  return (
    <main className="mt-1 border-t border-neutral-200 dark:border-neutral-800">
      <Container>{children}</Container>
    </main>
  );
};

export default Layout;
