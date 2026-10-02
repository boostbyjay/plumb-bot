import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1", "localhost", "*.cursor.sh", "*.cursorusercontent.com"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;