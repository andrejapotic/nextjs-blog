import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
        pathname: "/**",
      },
      {
        hostname: "different-akita-256.eu-west-1.convex.cloud",
        protocol: "https",
        port: "",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;
