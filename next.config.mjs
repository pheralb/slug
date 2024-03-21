await import("./src/env.mjs");
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
    mdxRs: true,
  },
};

const MDXOptions = withMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default MDXOptions(nextConfig);
