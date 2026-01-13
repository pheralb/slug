await import("./src/env.mjs");

// Next.js config:
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
    serverComponentsExternalPackages: ["@libsql/client", "libsql", "@prisma/adapter-libsql", "@libsql/hrana-client"],
  },
};

export default nextConfig;
