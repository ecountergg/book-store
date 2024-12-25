import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
  },
};

export default nextConfig;
