import type { NextConfig } from "next";

// STATIC_EXPORT=1 npm run build writes a plain static copy of the site to .next-static
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Avoid concurrent static-output directory races on Windows.
  experimental: process.platform === "win32" ? { cpus: 1, staticGenerationMaxConcurrency: 1 } : undefined,
  ...(isStatic && { output: "export" as const, trailingSlash: true, distDir: ".next-static" }),
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
