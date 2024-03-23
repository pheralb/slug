import Container from "@/ui/container";
import type { ReactNode } from "react";

interface LayoutDocsProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutDocsProps) => {
  return (
    <main className="mt-2 border-t border-neutral-200 dark:border-neutral-800">
      <Container>
        <article className="prose dark:prose-invert">{children}</article>
      </Container>
    </main>
  );
};

export default Layout;
