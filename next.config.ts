import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    PORT: process.env.APP_PORT,
  },
  transpilePackages: ["next-auth"],
};

export default nextConfig;
