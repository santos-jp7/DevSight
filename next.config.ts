import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["25kb3ggl-3003.brs.devtunnels.ms", "localhost:3003"],
    },
  },
};

export default nextConfig;
