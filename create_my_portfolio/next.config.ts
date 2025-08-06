import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow production builds even if there are type errors
    ignoreBuildErrors: true,
  },
  /* other config options here */
};

export default nextConfig;
