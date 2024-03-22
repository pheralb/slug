await import("./src/env.mjs");
import withMDX from "@next/mdx";

// MDX Plugins:
import rehypePrettyCode from "rehype-pretty-code";

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyOptions = {
  keepBackground: false,
  theme: "vitesse-dark",
};

// Next.js config:
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
    mdxRs: true,
  },
};

// MDX Options:
const MDXOptions = withMDX({
  options: {
    rehypePlugins: [[rehypePrettyCode, rehypePrettyOptions]],
  },
});

export default MDXOptions(nextConfig);
