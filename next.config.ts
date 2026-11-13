import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    localPatterns: [
      { pathname: "/img-projects/**" },
      { pathname: "/img-about/**" },
      { pathname: "/media/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "animejs"],
  },
};

export default nextConfig;
