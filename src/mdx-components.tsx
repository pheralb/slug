import type { MDXComponents } from "mdx/types";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/ui/typography";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <TypographyH1>{children}</TypographyH1>,
    h2: ({ children }) => <TypographyH2>{children}</TypographyH2>,
    h3: ({ children }) => <TypographyH3>{children}</TypographyH3>,
    h4: ({ children }) => <TypographyH4>{children}</TypographyH4>,
    ...components,
  };
}
