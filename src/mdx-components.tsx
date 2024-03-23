import type { MDXComponents } from "mdx/types";

import { Code } from "bright";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
} from "@/ui/typography";


Code.theme = {
  dark: "github-dark",
  light: "github-light",
  lightSelector: "html.light",
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <TypographyH1>{children}</TypographyH1>,
    h2: ({ children }) => <TypographyH2>{children}</TypographyH2>,
    h3: ({ children }) => <TypographyH3>{children}</TypographyH3>,
    h4: ({ children }) => <TypographyH4>{children}</TypographyH4>,
    pre: Code,
    ...components,
  };
}
