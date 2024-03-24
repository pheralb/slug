import type { MDXComponents } from "mdx/types";

import { Code } from "bright";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyListUl,
  TypographyP,
} from "@/ui/typography";
import Link from "next/link";

Code.theme = {
  dark: "poimandres",
  light: "nord",
  lightSelector: "html.light",
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <TypographyH1>{children}</TypographyH1>,
    h2: ({ children }) => <TypographyH2>{children}</TypographyH2>,
    h3: ({ children }) => (
      <TypographyH3 className="text-2xl lg:text-3xl [&(:first-child)]:mb-5 [&:not(:first-child)]:mt-10">
        {children}
      </TypographyH3>
    ),
    h4: ({ children }) => <TypographyH4>{children}</TypographyH4>,
    p: ({ children }) => <TypographyP>{children}</TypographyP>,
    a: ({ children, href }) => (
      <Link
        href={href!}
        className="underline decoration-neutral-800 decoration-dotted underline-offset-4 hover:opacity-80 dark:decoration-neutral-400"
      >
        {children}
      </Link>
    ),
    pre: Code,
    ul: ({ children }) => <TypographyListUl>{children}</TypographyListUl>,
    ...components,
  };
}
