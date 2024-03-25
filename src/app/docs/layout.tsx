import type { ReactNode } from "react";

import ExternalLink from "@/ui/external-link";
import { BookIcon } from "lucide-react";
import Link from "next/link";

interface LayoutDocsProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutDocsProps) => {
  return (
    <>
      <header className="fixed w-full z-50 border-y border-neutral-200 bg-white py-4 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="container flex items-center justify-between text-sm">
          <Link href="/docs">
            <div className="flex items-center space-x-2">
              <BookIcon size={16} strokeWidth={1.5} />
              <p className="font-mono">Documentation</p>
            </div>
          </Link>
          <ExternalLink href="">Edit this page on GitHub</ExternalLink>
        </div>
      </header>
      <main>
        <article className="prose duration-300 animate-in fade-in-20 slide-in-from-bottom-2 dark:prose-invert prose-pre:font-mono prose-ol:mb-0">
          {children}
        </article>
      </main>
    </>
  );
};

export default Layout;
