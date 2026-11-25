import type { NextConfig } from "next"

// STATIC_EXPORT=1 writes a static copy to .next-static. DS_BASE is the path it
// will be served under (the site serves these copies from /ds/v1 and /ds/v2).
const isStatic = process.env.STATIC_EXPORT === "1"
const base = process.env.DS_BASE || ""

const nextConfig: NextConfig = {
  experimental:
    process.platform === "win32"
      ? { cpus: 1, staticGenerationMaxConcurrency: 1 }
      : undefined,
  ...(isStatic && {
    output: "export" as const,
    trailingSlash: true,
    distDir: ".next-static",
  }),
  ...(base && { basePath: base }),
}

export default nextConfig
