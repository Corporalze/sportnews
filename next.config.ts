import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 // This tells Next.js to use the src directory as the root
  experimental: {
    appDir: true,
  },
  // This ensures the src directory is properly recognized
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default nextConfig;
